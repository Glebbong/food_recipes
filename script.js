document.addEventListener('DOMContentLoaded', () => {
  const list           = document.getElementById('recipes-list');
  const searchInput    = document.getElementById('search-input');
  const categorySelect = document.getElementById('filter-category');
  const resultsCount   = document.getElementById('results-count');

  // Единый поиск: и по названию блюда, и по ингредиентам
  function matchesSearch(recipe, query) {
    if (!query) return true;
    const q = query.toLowerCase().trim();
    if (recipe.title.toLowerCase().includes(q)) return true;
    return recipe.ingredients.some(ing => ing.name.toLowerCase().includes(q));
  }

  function pluralize(n, one, few, many) {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
    return many;
  }

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function renderRecipes(items) {
    list.innerHTML = '';

    resultsCount.textContent =
      `Найдено: ${items.length} ${pluralize(items.length, 'рецепт', 'рецепта', 'рецептов')}`;

    if (items.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <strong>Ничего не найдено</strong>
          Попробуйте изменить запрос или выбрать другую категорию.
        </div>`;
      return;
    }

    items.forEach(recipe => {
      const card = document.createElement('article');
      card.className = 'recipe-card';

      const ingredientsHTML = recipe.ingredients
        .map(ing => `
          <li>
            <span class="ingredient-name">${ing.name}</span>
            <span class="ingredient-amount">${ing.amount}</span>
          </li>`)
        .join('');

      const savedComments = JSON.parse(
        localStorage.getItem(`comments_recipe_${recipe.id}`) || '[]'
      );

      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image" loading="lazy">
        <div class="recipe-content">
          <span class="recipe-category">${recipe.category}</span>
          <h2 class="recipe-title">${recipe.title}</h2>
          <p class="recipe-description">${recipe.description}</p>

          <div class="nutrition-block">
            <div class="nutrition-item"><span class="value">${recipe.nutrition.calories}</span><span class="label">Ккал</span></div>
            <div class="nutrition-item"><span class="value">${recipe.nutrition.protein}</span><span class="label">Белки</span></div>
            <div class="nutrition-item"><span class="value">${recipe.nutrition.fat}</span><span class="label">Жиры</span></div>
            <div class="nutrition-item"><span class="value">${recipe.nutrition.carbs}</span><span class="label">Углеводы</span></div>
          </div>

          <div class="ingredients-list">
            <h4>Ингредиенты (на порцию)</h4>
            <ul>${ingredientsHTML}</ul>
          </div>

          <a href="${recipe.videoUrl}" target="_blank" rel="noopener" class="video-link">▶ Видео-рецепт</a>

          <div class="comments-section">
            <h4>Заметки</h4>
            <textarea class="comment-input"
                      placeholder="Введите пометку и нажмите Enter..."
                      data-recipe-id="${recipe.id}"></textarea>
            <ul class="comment-list" id="comment-list-${recipe.id}">
              ${savedComments.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;

      list.appendChild(card);

      const textarea    = card.querySelector('.comment-input');
      const commentList = card.querySelector(`#comment-list-${recipe.id}`);
      const draftKey    = `draft_recipe_${recipe.id}`;
      const savedDraft  = localStorage.getItem(draftKey);
      if (savedDraft) textarea.value = savedDraft;

      textarea.addEventListener('input', e =>
        localStorage.setItem(draftKey, e.target.value)
      );

      textarea.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          const text = textarea.value.trim();
          if (!text) return;

          const li = document.createElement('li');
          li.textContent = text;
          commentList.appendChild(li);

          const all = JSON.parse(
            localStorage.getItem(`comments_recipe_${recipe.id}`) || '[]'
          );
          all.push(text);
          localStorage.setItem(`comments_recipe_${recipe.id}`, JSON.stringify(all));

          textarea.value = '';
          localStorage.removeItem(draftKey);
        }
      });
    });
  }

  function filterRecipes() {
    const query    = searchInput.value.trim();
    const category = categorySelect.value;

    const filtered = recipes.filter(recipe => {
      if (category !== 'all' && recipe.category !== category) return false;
      if (!matchesSearch(recipe, query)) return false;
      return true;
    });

    renderRecipes(filtered);
  }

  renderRecipes(recipes);
  searchInput.addEventListener('input', filterRecipes);
  categorySelect.addEventListener('change', filterRecipes);
});
