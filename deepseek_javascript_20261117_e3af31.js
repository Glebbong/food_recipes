// Ждём загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const recipesList = document.getElementById('recipes-list');
    const searchNameInput = document.getElementById('search-name');
    const searchIngredientInput = document.getElementById('search-ingredient');
    const categorySelect = document.getElementById('filter-category');

    // Функция отрисовки карточек
    function renderRecipes(filteredRecipes) {
        recipesList.innerHTML = '';

        if (filteredRecipes.length === 0) {
            recipesList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">Рецепты не найдены. Попробуйте изменить фильтры.</p>';
            return;
        }

        filteredRecipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.dataset.id = recipe.id;

            // Формируем список ингредиентов
            const ingredientsHTML = recipe.ingredients.map(ing => `
                <li>
                    <span class="ingredient-name">${ing.name}</span>
                    <span class="ingredient-amount">${ing.amount} <small>(${ing.kbju})</small></span>
                </li>
            `).join('');

            // Загружаем сохранённые комментарии для этого рецепта
            const savedComments = JSON.parse(localStorage.getItem(`comments_recipe_${recipe.id}`)) || [];

            card.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image" loading="lazy">
                <div class="recipe-content">
                    <span class="recipe-category">${recipe.category}</span>
                    <h2 class="recipe-title">${recipe.title}</h2>
                    <p class="recipe-description">${recipe.description}</p>

                    <div class="nutrition-block">
                        <div class="nutrition-item"><span class="value">${recipe.nutrition.calories}</span><span class="label">Ккал</span></div>
                        <div class="nutrition-item"><span class="value">${recipe.nutrition.protein} г</span><span class="label">Белки</span></div>
                        <div class="nutrition-item"><span class="value">${recipe.nutrition.fat} г</span><span class="label">Жиры</span></div>
                        <div class="nutrition-item"><span class="value">${recipe.nutrition.carbs} г</span><span class="label">Углеводы</span></div>
                    </div>

                    <div class="ingredients-list">
                        <h4>Ингредиенты (на порцию)</h4>
                        <ul>${ingredientsHTML}</ul>
                    </div>

                    <a href="${recipe.videoUrl}" target="_blank" class="video-link">▶ Смотреть видео-рецепт</a>

                    <div class="comments-section">
                        <h4>Мои заметки / комментарии</h4>
                        <textarea class="comment-input" placeholder="Напишите пометку..." data-recipe-id="${recipe.id}"></textarea>
                        <ul class="comment-list" id="comment-list-${recipe.id}">
                            ${savedComments.map(comment => `<li>${comment}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;

            recipesList.appendChild(card);

            // Добавляем обработчик для сохранения комментария
            const textarea = card.querySelector('.comment-input');
            const commentList = card.querySelector(`#comment-list-${recipe.id}`);

            // Восстанавливаем текст из localStorage (если есть)
            const draftKey = `draft_recipe_${recipe.id}`;
            const savedDraft = localStorage.getItem(draftKey);
            if (savedDraft) textarea.value = savedDraft;

            // Сохраняем черновик при вводе
            textarea.addEventListener('input', (e) => {
                localStorage.setItem(draftKey, e.target.value);
            });

            // По нажатию Enter (без Shift) добавляем комментарий
            textarea.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    const commentText = textarea.value.trim();
                    if (!commentText) return;

                    // Добавляем в список на странице
                    const li = document.createElement('li');
                    li.textContent = commentText;
                    commentList.appendChild(li);

                    // Сохраняем в localStorage
                    const comments = JSON.parse(localStorage.getItem(`comments_recipe_${recipe.id}`)) || [];
                    comments.push(commentText);
                    localStorage.setItem(`comments_recipe_${recipe.id}`, JSON.stringify(comments));

                    // Очищаем поле и черновик
                    textarea.value = '';
                    localStorage.removeItem(draftKey);
                }
            });
        });
    }

    // Функция фильтрации
    function filterRecipes() {
        const nameQuery = searchNameInput.value.toLowerCase().trim();
        const ingredientQuery = searchIngredientInput.value.toLowerCase().trim();
        const category = categorySelect.value;

        const filtered = recipes.filter(recipe => {
            // Фильтр по категории
            if (category !== 'all' && recipe.category !== category) return false;

            // Фильтр по названию
            if (nameQuery && !recipe.title.toLowerCase().includes(nameQuery)) return false;

            // Фильтр по ингредиентам
            if (ingredientQuery) {
                const hasIngredient = recipe.ingredients.some(ing =>
                    ing.name.toLowerCase().includes(ingredientQuery)
                );
                if (!hasIngredient) return false;
            }

            return true;
        });

        renderRecipes(filtered);
    }

    // Начальная отрисовка
    renderRecipes(recipes);

    // Слушатели событий для фильтров
    searchNameInput.addEventListener('input', filterRecipes);
    searchIngredientInput.addEventListener('input', filterRecipes);
    categorySelect.addEventListener('change', filterRecipes);
});