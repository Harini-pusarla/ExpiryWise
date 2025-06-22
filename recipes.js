document.addEventListener('DOMContentLoaded', function () {
    const recipeList = document.getElementById('recipe-list');

    // Example recipe list (can be replaced with API data)
    const exampleRecipes = [
        { name: "Chicken Soup", ingredients: ["chicken", "carrot", "onion"] },
        { name: "Vegetable Stir-Fry", ingredients: ["broccoli", "carrot", "pepper"] },
        { name: "Pasta Salad", ingredients: ["pasta", "tomato", "onion"] },
        { name: "Egg Fried Rice", ingredients: ["egg", "rice", "onion"] }
    ];

    // Load and render recipes
    function renderRecipes(recipes, foodItems) {
        recipeList.innerHTML = '';

        recipes.forEach(recipe => {
            if (recipe.ingredients.some(ingredient => foodItems.includes(ingredient))) {
                const li = document.createElement('li');
                li.textContent = `${recipe.name} (uses: ${recipe.ingredients.join(', ')})`;
                recipeList.appendChild(li);
            }
        });
    }

    // Get food items from localStorage
    const foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];
    const availableItems = foodItems.map(item => item.name.toLowerCase());

    // Render recipes based on available ingredients
    renderRecipes(exampleRecipes, availableItems);
});