document.addEventListener('DOMContentLoaded', () => {
    const ingredientInput = document.getElementById('ingredient-input');
    const addBtn = document.getElementById('add-btn');
    const ingredientsList = document.getElementById('ingredients-list');
    const generateBtn = document.getElementById('generate-btn');
    const recipeSection = document.getElementById('recipe-section');
    const datalist = document.getElementById('ingredient-suggestions');

    const commonIngredients = [
        "Tomato", "Garlic", "Onion", "Basil", "Chicken", "Pasta", "Cheese", "Olive Oil",
        "Lemon", "Pepper", "Mushroom", "Spinach", "Butter", "Ginger", "Honey",
        "Shrimp", "Beef", "Rice", "Egg", "Chili", "Avocado", "Cilantro",
        "Lime", "Flour", "Sugar", "Milk", "Potato", "Carrot", "Bell Pepper", "Broccoli",
        "Salt", "Black Pepper", "Cumin", "Paprika", "Oregano", "Thyme", "Rosemary", "Parsley",
        "Cream", "Yogurt", "Sour Cream", "Parmesan", "Mozzarella", "Cheddar", "Feta",
        "Bacon", "Pork", "Turkey", "Salmon", "Tuna", "Cod", "Tofu", "Lentils", "Chickpeas",
        "Quinoa", "Couscous", "Baguette", "Soy Sauce", "Sesame Oil", "Rice Vinegar", "Balsamic Vinegar",
        "Mayonnaise", "Mustard", "Ketchup", "Sriracha", "Cornstarch", "Baking Powder", "Yeast",
        "Walnuts", "Almonds", "Pine Nuts", "Peanuts", "Cashews", "Coconut Milk", "Maple Syrup",
        "Vanilla", "Cinnamon", "Nutmeg", "Cloves", "Turmeric", "Coriander", "Cardamom",
        "Celery", "Zucchini", "Eggplant", "Asparagus", "Green Beans", "Peas", "Corn",
        "Kale", "Arugula", "Cabbage", "Cauliflower", "Sweet Potato", "Pumpkin", "Butternut Squash",
        "Apple", "Banana", "Strawberry", "Blueberry", "Raspberry", "Orange", "Grape", "Pineapple", "Mango",
        "Pesto", "Marinara", "Alfredo", "Tahini", "Hummus", "Cocoa Powder", "Chocolate", "Coffee",
        "Anchovies", "Capers", "Olives", "Pickles", "Jalapeño", "Habanero", "Scallions", "Shallots",
        "Leeks", "Artichoke", "Fennel", "Radish", "Cucumber", "Beets", "Turnip", "Parsnip",
        "Mussels", "Clams", "Scallops", "Crab", "Lobster", "Duck", "Lamb", "Venison",
        "Pear", "Peach", "Plum", "Cherry", "Kiwi", "Watermelon", "Cantaloupe", "Pomegranate",
        "Dates", "Figs", "Raisins", "Cranberries", "Apricots", "Walnut Oil", "Truffle Oil",
        "Mirin", "Miso", "Fish Sauce", "Worcestershire Sauce", "Gochujang", "Harissa", "Curry Powder",
        "Star Anise", "Saffron", "Sumac", "Za'atar", "Bay Leaves", "Sage", "Dill", "Mint", "Tarragon"
    ];


    let ingredients = [];
    let currentRecipes = null;

    const ingredientData = {
        "Garlic": { unit: "cloves", states: ["minced", "crushed", "slivered"] },
        "Onion": { unit: "whole", states: ["finely diced", "thinly sliced", "quartered"] },
        "Tomato": { unit: "whole", states: ["seeded and chopped", "sliced", "crushed"] },
        "Basil": { unit: "leaves", states: ["fresh, torn", "chiffonade", "dried"] },
        "Pasta": { unit: "oz", states: ["dry", "cooked al dente"] },
        "Chicken": { unit: "lbs", states: ["boneless, skinless, cubed", "breast halves", "thighs"] },
        "Beef": { unit: "lbs", states: ["ground", "thinly sliced against the grain", "stew meat"] },
        "Shrimp": { unit: "lbs", states: ["peeled and deveined", "tail-on", "frozen, thawed"] },
        "Olive Oil": { unit: "tbsp", states: ["extra virgin", "for drizzling"] },
        "Butter": { unit: "tbsp", states: ["unsalted, softened", "cold, cubed", "melted"] },
        "Lemon": { unit: "whole", states: ["zested and juiced", "sliced into wedges"] },
        "Honey": { unit: "tbsp", states: ["raw", "warmed"] },
        "Milk": { unit: "cups", states: ["whole", "at room temperature"] },
        "Flour": { unit: "cups", states: ["all-purpose, sifted", "measured correctly"] },
        "Sugar": { unit: "tbsp", states: ["granulated", "firmly packed brown"] },
        "Egg": { unit: "large", states: ["at room temperature", "lightly beaten"] },
        "Cheese": { unit: "cups shredded", states: ["sharp cheddar", "freshly grated parmesan"] },
        "Potato": { unit: "lbs", states: ["peeled and cubed", "scrubbed clean", "thinly sliced"] },
        "Rice": { unit: "cups", states: ["long-grain", "rinsed until clear"] },
        "Salt": { unit: "tsp", states: ["kosher", "fine sea salt"] },
        "Black Pepper": { unit: "tsp", states: ["freshly ground", "cracked"] },
        "Mushroom": { unit: "cups sliced", states: ["cremini", "button, cleaned"] },
        "Spinach": { unit: "cups", states: ["fresh baby", "frozen, squeezed dry"] },
        "Soy Sauce": { unit: "tbsp", states: ["low-sodium", "dark"] },
        "Ginger": { unit: "tsp grated", states: ["freshly peeled", "minced"] },
        "Chili": { unit: "tsp flakes", states: ["red pepper", "dried"] }
    };

    // Populate Datalist
    const populateDatalist = () => {
        datalist.innerHTML = '';
        commonIngredients.forEach(ing => {
            const option = document.createElement('option');
            option.value = ing;
            datalist.appendChild(option);
        });
    };

    populateDatalist();

    const generateDetailProportion = (ing) => {
        const data = ingredientData[ing] || { unit: "cups", states: ["prepared as desired"] };
        const state = data.states[Math.floor(Math.random() * data.states.length)];
        let amount;
        if (data.unit === "whole" || data.unit === "cloves" || data.unit === "large") {
            amount = Math.floor(Math.random() * 3) + 1;
        } else if (data.unit === "tbsp" || data.unit === "tsp") {
            amount = Math.floor(Math.random() * 2) + 1;
        } else {
            amount = (Math.random() * 1.5 + 0.5).toFixed(1);
        }
        return `${amount} ${data.unit} ${ing}, ${state}`;
    };

    const addIngredient = () => {
        const text = ingredientInput.value.trim();
        if (text && !ingredients.includes(text)) {
            ingredients.push(text);
            renderChips();
            ingredientInput.value = '';
            ingredientInput.focus();
        }
    };

    const removeIngredient = (index) => {
        ingredients.splice(index, 1);
        renderChips();
    };

    const renderChips = () => {
        ingredientsList.innerHTML = '';
        ingredients.forEach((ing, index) => {
            const chip = document.createElement('div');
            chip.className = 'chip';
            chip.innerHTML = `
                <span>${ing}</span>
                <span class="remove" onclick="removeIngredient(${index})">&times;</span>
            `;
            ingredientsList.appendChild(chip);
        });
    };

    // Global expose for onclick
    window.removeIngredient = removeIngredient;

    ingredientInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addIngredient();
    });

    addBtn.addEventListener('click', addIngredient);

    // Suggestion chips logic
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const text = chip.textContent;
            if (!ingredients.includes(text)) {
                ingredients.push(text);
                renderChips();
            }
        });
    });

    generateBtn.addEventListener('click', async () => {
        if (ingredients.length === 0) {
            alert("Please add some ingredients first!");
            return;
        }

        // UI state for generating
        generateBtn.disabled = true;
        generateBtn.innerHTML = `<span>Magic in progress...</span> <div class="loading-spinner"></div>`;
        recipeSection.style.display = 'block';
        recipeSection.innerHTML = `
            <div class="glass-card recipe-card">
                <div class="skeleton" style="height: 40px; width: 60%; margin-bottom: 2rem;"></div>
                <div class="recipe-sections">
                    <div>
                        <div class="skeleton" style="height: 20px; width: 40%; margin-bottom: 1rem;"></div>
                        <div class="skeleton" style="height: 100px; width: 100%;"></div>
                    </div>
                    <div>
                        <div class="skeleton" style="height: 20px; width: 40%; margin-bottom: 1rem;"></div>
                        <div class="skeleton" style="height: 200px; width: 100%;"></div>
                    </div>
                </div>
            </div>
        `;

        // Simulate "AI" generation delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        currentRecipes = generateMultiLevelRecipes(ingredients);
        displayRecipe('beginner');

        generateBtn.disabled = false;
        generateBtn.innerHTML = `<span>Generate Recipe</span> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 0 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 0-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>`;

        // Scroll to recipe
        recipeSection.scrollIntoView({ behavior: 'smooth' });
    });

    const generateMultiLevelRecipes = (ings) => {
        const baseTitle = `${ings[0]} Dish`;
        const detailedIngs = ings.map(i => generateDetailProportion(i));

        const metadata = {
            beginner: { prep: "15 mins", cook: "20 mins", total: "35 mins", yield: "4 servings" },
            intermediate: { prep: "30 mins", cook: "45 mins", total: "1 hr 15 mins", yield: "4-6 servings" }
        };

        return {
            beginner: {
                level: 'Beginner',
                meta: metadata.beginner,
                title: `Easy ${baseTitle}`,
                desc: "A quick and simple way to make this dish without any fuss.",
                ingredients: detailedIngs,
                phases: [
                    {
                        name: "Getting Ready",
                        steps: [
                            `Put all your ingredients on the counter. ${ings.length > 3 ? "Keep the smaller items together so they are easy to find." : ""}`,
                            `Chop up any big vegetables so they cook evenly.`
                        ]
                    },
                    {
                        name: "The Cooking Part",
                        steps: [
                            `Heat a large pan over medium-high heat. Add some oil and swirl it around.`,
                            `Put the ${ings.slice(0, 2).join(' and ')} in the pan. Cook until they smell good and start to get soft, about 5 minutes.`,
                            `Add the rest of the ingredients: ${ings.slice(2).join(', ')}. Stir every now and then until everything is hot and tasty.`,
                            `Add some salt and pepper to make the flavors pop.`
                        ]
                    }
                ]
            },
            intermediate: {
                level: 'Intermediate',
                title: `Gourmet ${baseTitle}`,
                meta: metadata.intermediate,
                desc: "A bit more detailed with extra flavors and better textures.",
                ingredients: [...detailedIngs, "1/2 cup White Wine (optional)", "2 tbsp Fresh Parsley, chopped"],
                phases: [
                    {
                        name: "Preparation",
                        steps: [
                            `Cut all your vegetables into same-sized pieces so they cook at the same time.`,
                            `Measure out your liquids and spices before you start the stove.`
                        ]
                    },
                    {
                        name: "Building Flavor",
                        steps: [
                            `In a deep pan, brown the main ingredients until they have a nice dark crust. Take them out and set them aside.`,
                            `Turn down the heat and add the ${ings[0]}. Cook slowly until they are brown and sweet.`,
                            `Add the wine (or a splash of water) and scrape up the tasty brown bits from the bottom of the pan.`
                        ]
                    },
                    {
                        name: "The Final Simmer",
                        steps: [
                            `Put the main ingredients back in the pan and add the ${ings.slice(1).join(', ')}.`,
                            `Bring to a light boil, then turn the heat down low. Let it simmer for 30 minutes until the sauce thickens up.`,
                            `Add a small piece of butter at the end for a shiny finish and top with the fresh parsley.`
                        ]
                    }
                ]
            }
        };
    };

    const displayRecipe = (level) => {
        if (!currentRecipes) return;
        const recipe = currentRecipes[level];
        const diffClass = `diff-${level}`;

        recipeSection.innerHTML = `
            <div class="tabs-container">
                <button class="tab-btn ${level === 'beginner' ? 'active' : ''}" onclick="displayRecipe('beginner')">Beginner</button>
                <button class="tab-btn ${level === 'intermediate' ? 'active' : ''}" onclick="displayRecipe('intermediate')">Intermediate</button>
            </div>
            <div class="glass-card recipe-card">
                <div class="recipe-header" style="margin-bottom: 1.5rem;">
                    <div>
                        <span class="difficulty-badge ${diffClass}">${recipe.level}</span>
                        <h2 class="recipe-title">${recipe.title}</h2>
                    </div>
                    <span style="color: var(--accent); font-weight: 700; display: flex; align-items: center; gap: 0.5rem;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path></svg>
                        Professional Quality
                    </span>
                </div>

                <div class="recipe-meta-bar">
                    <div class="meta-item">
                        <span class="meta-label">Prep</span>
                        <span class="meta-value">${recipe.meta.prep}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Cook</span>
                        <span class="meta-value">${recipe.meta.cook}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Total</span>
                        <span class="meta-value">${recipe.meta.total}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Yield</span>
                        <span class="meta-value">${recipe.meta.yield}</span>
                    </div>
                </div>
                
                <p style="margin-bottom: 2rem; color: var(--text-main); font-style: italic; opacity: 0.9;">
                    "${recipe.desc}"
                </p>

                <div class="recipe-sections">
                    <div class="ingredients">
                        <h3 class="recipe-sub">Ingredients</h3>
                        <ul class="ing-list">
                            ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="instructions">
                        <h3 class="recipe-sub">Preparation</h3>
                        ${recipe.phases.map(phase => `
                            <div class="recipe-phase">
                                <h4 class="phase-header">${phase.name}</h4>
                                <ol class="inst-list">
                                    ${phase.steps.map(step => `<li>${step}</li>`).join('')}
                                </ol>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    };

    window.displayRecipe = displayRecipe;
});
