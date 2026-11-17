const recipes = [
    {
        id: 1,
        title: "Яичница-глазунья",
        category: "завтрак",
        description: "Классический быстрый завтрак. Готовится за 5 минут, отлично насыщает.",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop", // Пример фото
        videoUrl: "https://www.youtube.com/embed/OJsrIJe0j40",
        nutrition: { calories: 196, protein: 14, fat: 15, carbs: 1 }, // На 100 г
        ingredients: [
            { name: "Яйцо куриное", amount: "2 шт. (110 г)", kbju: "~155 ккал / 12.6 / 10.9 / 0.8" },
            { name: "Масло сливочное", amount: "10 г", kbju: "~75 ккал / 0.1 / 8.2 / 0.1" },
            { name: "Соль, перец", amount: "по вкусу", kbju: "0 ккал" }
        ]
    },
    {
        id: 2,
        title: "Кесадилья с курицей",
        category: "обед",
        description: "Сытное мексиканское блюдо. Хрустящая тортилья, сочная курица и тянущийся сыр.",
        image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=600&auto=format&fit=crop", // Пример фото
        videoUrl: "https://www.youtube.com/embed/LZUyD0nrE4M",
        nutrition: { calories: 294, protein: 15.1, fat: 15.3, carbs: 22 }, // На 100 г
        ingredients: [
            { name: "Тортилья пшеничная", amount: "1 шт. (60 г)", kbju: "~180 ккал / 5 / 4 / 30" },
            { name: "Куриная грудка (отварная)", amount: "80 г", kbju: "~130 ккал / 24 / 2 / 0" },
            { name: "Сыр твёрдый", amount: "40 г", kbju: "~150 ккал / 10 / 12 / 0" },
            { name: "Перец болгарский", amount: "30 г", kbju: "~10 ккал / 0.3 / 0.1 / 2" }
        ]
    },
    {
        id: 3,
        title: "Салат с тунцом",
        category: "ужин",
        description: "Лёгкий, но питательный салат. Идеально для быстрого ужина или перекуса.",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop", // Пример фото
        videoUrl: "https://www.youtube.com/embed/Xcg6K0VlHe4",
        nutrition: { calories: 187, protein: 16, fat: 9.3, carbs: 9.4 }, // На 100 г
        ingredients: [
            { name: "Тунец консервированный (в собственном соку)", amount: "1 банка (150 г)", kbju: "~160 ккал / 25 / 7 / 0" },
            { name: "Яйцо отварное", amount: "1 шт. (55 г)", kbju: "~80 ккал / 6.5 / 5.5 / 0.5" },
            { name: "Огурец свежий", amount: "1 шт. (100 г)", kbju: "~15 ккал / 0.8 / 0.1 / 3" },
            { name: "Кукуруза консервированная", amount: "50 г", kbju: "~45 ккал / 1.5 / 0.5 / 8" },
            { name: "Заправка (сметана/йогурт)", amount: "2 ст. л. (40 г)", kbju: "~60 ккал / 1 / 5 / 2" }
        ]
    }
];