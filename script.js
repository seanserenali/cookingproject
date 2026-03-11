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


    let categorizedIngredients = {
        proteins: [],
        carbs: [],
        veggies: [],
        flavors: []
    };

    const ingredientSubtypes = {
        'Chicken': ['Chicken Thighs', 'Chicken Breast', 'Ground Chicken', 'Whole Chicken'],
        'Beef': ['Ground Beef', 'Flank Steak', 'Beef Chuck', 'Ribeye'],
        'Pork': ['Pork Chops', 'Pork Tenderloin', 'Ground Pork', 'Bacon'],
        'Pasta': ['Spaghetti', 'Penne', 'Fusilli', 'Macaroni', 'Linguine'],
        'Cheese': ['Cheddar', 'Mozzarella', 'Parmesan', 'Feta', 'Gruyere'],
        'Rice': ['White Rice', 'Brown Rice', 'Basmati', 'Jasmine', 'Arborio'],
        'Tomato': ['Cherry Tomatoes', 'Roma Tomatoes', 'Crushed Tomatoes', 'Sun-dried Tomatoes'],
        'Onion': ['Yellow Onion', 'Red Onion', 'White Onion', 'Shallots']
    };
    let currentRecipes = null;

    const ingredientData = {
        "Garlic": { unit: "cloves", states: ["minced", "crushed", "slivered"] },
        "Onion": { unit: "whole", states: ["finely diced", "thinly sliced", "quartered"] },
        "Tomato": { unit: "whole", states: ["seeded and chopped", "sliced", "crushed"] },
        "Basil": { unit: "leaves", states: ["fresh, torn", "chiffonade", "dried"] },
        "Pasta": { unit: "oz", states: ["dry", "cooked al dente"] },
        "Chicken": { unit: "lbs", states: ["boneless, skinless, cubed", "breast halves", "thighs"] },
        "Beef": { unit: "lbs", states: ["ground", "thinly sliced against the grain", "stew meat"] },
        "Pork": { unit: "lbs", states: ["tenderloin, sliced", "chops", "ground"] },
        "Shrimp": { unit: "lbs", states: ["peeled and deveined", "tail-on", "frozen, thawed"] },
        "Olive Oil": { unit: "tbsp", states: ["extra virgin", "for drizzling"] },
        "Butter": { unit: "tbsp", states: ["unsalted, softened", "cold, cubed", "melted"] },
        "Lemon": { unit: "whole", states: ["zested and juiced", "sliced into wedges"] },
        "Salmon": { unit: "lbs", states: ["fillets, skin on", "center cut"] },
        "Cilantro": { unit: "cup loosely packed", states: ["fresh, roughly chopped", "stems removed"] },
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
        "Mushroom": { unit: "cups", states: ["cremini, sliced", "button, cleaned and quartered"] },
        "Spinach": { unit: "cups", states: ["fresh baby", "frozen, squeezed dry"] },
        "Soy Sauce": { unit: "tbsp", states: ["low-sodium", "dark"] },
        "Ginger": { unit: "tsp", states: ["freshly grated", "minced"] },
        "Chili": { unit: "tsp", states: ["red pepper flakes", "powder"] },
        "Tofu": { unit: "oz", states: ["extra firm, pressed and cubed", "silken"] },
        "Lentils": { unit: "cups", states: ["dry, sorted and rinsed", "cooked"] },
        "Chickpeas": { unit: "15-oz can", states: ["rinsed and drained"] },
        "Quinoa": { unit: "cups", states: ["dry, rinsed well", "cooked"] },
        "Avocado": { unit: "whole", states: ["pitted and sliced", "mashed"] },
        "Bell Pepper": { unit: "whole", states: ["seeded and diced", "sliced into strips"] },
        "Broccoli": { unit: "cups", states: ["florets", "steamed"] },
        "Carrot": { unit: "whole", states: ["peeled and diced", "shredded"] },
        "Zucchini": { unit: "whole", states: ["sliced into half-moons", "spiralized"] },
        "Asparagus": { unit: "bunch", states: ["ends trimmed", "cut into 2-inch pieces"] },
        "Green Beans": { unit: "lbs", states: ["trimmed", "halved"] },
        "Heavy Cream": { unit: "cups", states: ["cold", "at room temperature"] },
        "Parmesan": { unit: "cups", states: ["freshly grated", "shredded"] },
        "Feta": { unit: "oz", states: ["crumbled", "in brine"] },
        "Balsamic Vinegar": { unit: "tbsp", states: ["aged", "glaze"] },
        "Rice Vinegar": { unit: "tbsp", states: ["unseasoned"] },
        "Sesame Oil": { unit: "tsp", states: ["toasted"] },
        "Sriracha": { unit: "tsp", states: ["or to taste"] },
        "Mustard": { unit: "tbsp", states: ["Dijon", "whole grain"] }
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
        // Simple heuristic for generic ingredients not in our list
        const textLower = ing.toLowerCase();
        let fallbackUnit = "cups";
        if (textLower.includes("chicken") || textLower.includes("beef") || textLower.includes("pork") || textLower.includes("meat") || textLower.includes("fish")) {
            fallbackUnit = "lbs";
        } else if (textLower.includes("oil") || textLower.includes("sauce") || textLower.includes("vinegar") || textLower.includes("syrup")) {
            fallbackUnit = "tbsp";
        } else if (textLower.includes("salt") || textLower.includes("pepper") || textLower.includes("spice") || textLower.includes("powder")) {
            fallbackUnit = "tsp";
        } else if (textLower.includes("onion") || textLower.includes("tomato") || textLower.includes("lemon") || textLower.includes("lime") || textLower.includes("egg")) {
            fallbackUnit = "whole";
        }

        const data = ingredientData[ing] || { unit: fallbackUnit, states: ["prepared as desired"] };
        const state = data.states[Math.floor(Math.random() * data.states.length)];
        let amount;
        let amountStr;

        if (data.unit === "whole" || data.unit === "cloves" || data.unit === "large" || data.unit === "leaves") {
            amount = Math.floor(Math.random() * 3) + 1;
            amountStr = amount.toString();
        } else if (data.unit === "tbsp" || data.unit === "tsp") {
            amount = Math.floor(Math.random() * 3) + 1;
            amountStr = amount.toString();
        } else if (data.unit === "oz") {
            const commonSizes = [8, 12, 16];
            amountStr = commonSizes[Math.floor(Math.random() * commonSizes.length)].toString();
        } else {
            // For lbs and cups, use fractions for better recipe feel
            const fractions = ["1", "1 1/2", "2", "2 1/2", "1/2", "3/4", "1/4"];
            amountStr = fractions[Math.floor(Math.random() * fractions.length)];
        }

        // Clean up formatting
        const unitString = data.unit === "whole" ? "" : data.unit;
        return `${amountStr} ${unitString} ${ing}, ${state}`.replace(/\s+/g, ' ').trim();
    };

    const commitIngredient = (text, category) => {
        if (text && !categorizedIngredients[category].includes(text)) {
            categorizedIngredients[category].push(text);
            renderChips(category);
        }
    };

    // Subtype Modal Logic
    const subtypeModal = document.getElementById('subtype-modal');
    const subtypeTitle = document.getElementById('subtype-title');
    const subtypeOptions = document.getElementById('subtype-options');
    const cancelSubtypeBtn = document.getElementById('cancel-subtype');

    let pendingAddition = null;

    const openSubtypeModal = (broadTerm, subtypes, category) => {
        pendingAddition = { broadTerm, category };
        subtypeTitle.textContent = `Which type of ${broadTerm}?`;
        subtypeOptions.innerHTML = '';

        subtypes.forEach(type => {
            const btn = document.createElement('button');
            btn.className = 'secondary-btn';
            btn.textContent = type;
            btn.onclick = () => {
                commitIngredient(type, category);
                closeSubtypeModal();
            };
            subtypeOptions.appendChild(btn);
        });

        // Option to just use the broad term anyway
        const broadBtn = document.createElement('button');
        broadBtn.className = 'text-btn';
        broadBtn.textContent = `Just general ${broadTerm}`;
        broadBtn.onclick = () => {
            commitIngredient(broadTerm, pendingAddition.category);
            closeSubtypeModal();
        };
        subtypeOptions.appendChild(broadBtn);

        subtypeModal.classList.remove('hidden');
    };

    const closeSubtypeModal = () => {
        subtypeModal.classList.add('hidden');
        pendingAddition = null;
    };

    cancelSubtypeBtn.addEventListener('click', closeSubtypeModal);

    const handleAddRequest = (text, category) => {
        if (!text) return;
        text = text.trim();
        const titleCase = text.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

        // Check for subtypes
        for (const [broad, specificTypes] of Object.entries(ingredientSubtypes)) {
            if (titleCase === broad || text.toLowerCase() === broad.toLowerCase()) {
                openSubtypeModal(broad, specificTypes, category);
                return;
            }
        }

        // No subtypes, commit directly
        commitIngredient(text, category);
    };

    // Setup the 4 Input Groups
    document.querySelectorAll('.input-group.category-group').forEach(group => {
        const input = group.querySelector('input');
        const btn = group.querySelector('.add-btn');
        const category = input.getAttribute('data-cat');

        const triggerAdd = () => {
            handleAddRequest(input.value, category);
            input.value = '';
            input.focus();
        };

        btn.addEventListener('click', triggerAdd);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') triggerAdd();
        });
    });

    const removeIngredient = (category, index) => {
        categorizedIngredients[category].splice(index, 1);
        renderChips(category);
    };

    const renderChips = (category) => {
        const listEl = document.getElementById(`list-${category}`);
        listEl.innerHTML = '';
        categorizedIngredients[category].forEach((ing, index) => {
            const chip = document.createElement('div');
            chip.className = 'chip';
            chip.innerHTML = `
                <span>${ing}</span>
                <span class="remove" onclick="removeIngredient('${category}', ${index})">&times;</span>
            `;
            listEl.appendChild(chip);
        });
    };

    // Global expose for onclick
    window.removeIngredient = removeIngredient;

    // Suggestion chips logic
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const text = chip.textContent;

            // Auto-determine category based on its parent section
            let category = 'flavors'; // default
            const parentSection = chip.closest('.ingredient-category').querySelector('h4').textContent.toLowerCase();
            if (parentSection.includes('protein')) category = 'proteins';
            else if (parentSection.includes('dairy') || parentSection.includes('grain') || parentSection.includes('staples')) category = 'carbs'; // Staples going to carbs for now
            else if (parentSection.includes('veggie')) category = 'veggies';

            handleAddRequest(text, category);
        });
    });

    generateBtn.addEventListener('click', async () => {
        // Flatten ingredients for existing generation logic
        const allIngredients = [
            ...categorizedIngredients.proteins,
            ...categorizedIngredients.carbs,
            ...categorizedIngredients.veggies,
            ...categorizedIngredients.flavors
        ];

        if (allIngredients.length === 0) {
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

        currentRecipes = generateMultiLevelRecipes(allIngredients);
        displayRecipe('beginner');

        generateBtn.disabled = false;
        generateBtn.innerHTML = `<span>Generate Recipe</span> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 0 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 0-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>`;

        // Scroll to recipe
        recipeSection.scrollIntoView({ behavior: 'smooth' });
    });

    const detectDishType = (ings) => {
        const ingredients = ings.map(i => i.toLowerCase());
        if (ingredients.includes('pasta')) return 'Pasta';
        if (ingredients.includes('rice') || ingredients.some(i => ['soy sauce', 'ginger', 'sesame oil'].includes(i))) return 'Stir-fry';
        if (ingredients.some(i => ['chicken', 'beef', 'pork', 'shrimp', 'salmon'].includes(i))) return 'Protein Main';
        if (ingredients.includes('lettuce') || ingredients.includes('spinach') || ingredients.includes('arugula')) return 'Salad';
        if (ingredients.includes('tomato') || ingredients.includes('onion') || ingredients.includes('garlic')) return 'Classic';
        return 'Specialty';
    };

    const getStepsByDishType = (ings, dishType, level) => {
        const lowerIngs = ings.map(i => i.toLowerCase());
        const primary = lowerIngs[0];
        const secondary = lowerIngs.length > 1 ? lowerIngs.slice(1).join(' and ') : 'some basic aromatics';

        // Helper to extract specific ingredient types
        const findIng = (keywords) => lowerIngs.find(i => keywords.some(k => i.includes(k)));
        const filterOut = (ingToExclude) => lowerIngs.filter(i => i !== ingToExclude);

        const templates = {
            'Pasta': (() => {
                const pasta = findIng(['pasta', 'noodle', 'macaroni']) || 'pasta';
                const addIns = filterOut(pasta).length > 0 ? filterOut(pasta).join(' and ') : 'garlic and oil';
                return {
                    beginner: [
                        `Boil a large pot of salted water and cook the ${pasta} until tender.`,
                        `In a separate pan, heat oil and sauté the ${addIns} for 5 minutes.`,
                        `Drain the ${pasta}, reserving a little water, then toss everything together to combine.`
                    ],
                    intermediate: [
                        `Bring a large pot of water to a rolling boil and salt it generously. Cook the ${pasta} until al dente.`,
                        `Sauté the ${addIns} in olive oil until translucent, then deglaze the pan with a splash of water or wine.`,
                        `Emulsify the sauce by tossing the ${pasta} with the ${addIns} and adding hot pasta water until consistently glossy.`
                    ]
                };
            })(),
            'Stir-fry': (() => {
                const protein = findIng(['chicken', 'beef', 'pork', 'shrimp', 'tofu']) || 'protein';
                const veggies = filterOut(protein).length > 0 ? filterOut(protein).join(' and ') : 'vegetables';
                return {
                    beginner: [
                        `Chop all ingredients into bite-sized pieces for quick and even cooking.`,
                        `Heat a pan with oil until very hot, then stir-fry the ${protein} and ${veggies}.`,
                        `Add your favorite sauce and stir constantly for 3-5 minutes until everything is well coated.`
                    ],
                    intermediate: [
                        `Ensure all ingredients are dry to achieve a good sear. Prepare a simple cornstarch slurry for the sauce.`,
                        `Wok-sear the ${protein} in small batches to preserve texture, then remove from the pan.`,
                        `Flash-fry the ${veggies}, return the ${protein}, and toss rapidly with the sauce at high heat for a perfect glaze.`
                    ]
                };
            })(),
            'Protein Main': (() => {
                const protein = findIng(['chicken', 'beef', 'pork', 'shrimp', 'salmon']) || primary;
                const sides = filterOut(protein).length > 0 ? filterOut(protein).join(' and ') : 'side dishes';
                return {
                    beginner: [
                        `Season the ${protein} generously with salt and pepper on both sides.`,
                        `Sear the ${protein} in a hot pan for 4-6 minutes per side until cooked through.`,
                        `Sauté the ${sides} in the same pan to pick up all the delicious leftover flavors.`
                    ],
                    intermediate: [
                        `Pat the ${protein} completely dry and season ahead of time. Use a heavy pan for even heat distribution.`,
                        `Sear the ${protein} at high heat, then lower the temperature to baste with butter and herbs for a professional finish.`,
                        `Let the ${protein} rest for at least 5 minutes while you prepare a rich pan sauce with the ${sides}.`
                    ]
                };
            })(),
            'Salad': (() => {
                const greens = findIng(['lettuce', 'spinach', 'arugula', 'kale']) || 'greens';
                const toppings = filterOut(greens).length > 0 ? filterOut(greens).join(' and ') : 'additional ingredients';
                return {
                    beginner: [
                        `Wash and thoroughly dry the ${greens} to prevent a soggy salad.`,
                        `Toss the ${greens} with the ${toppings} in a large serving bowl.`,
                        `Drizzle with oil and citrus juice, then season with salt and pepper just before serving.`
                    ],
                    intermediate: [
                        `Whisk together a balanced vinaigrette using acid, oil, mustard, and aromatics.`,
                        `Layer the salad starting with the ${greens}, then aesthetically arrange the ${toppings} over the top.`,
                        `Toss gently by hand, ensuring every leaf is kissed by the dressing without being bruised or weighed down.`
                    ]
                };
            })(),
            'Classic': {
                beginner: [
                    `Slowly soften the ${secondary} in a pan with some oil over medium heat.`,
                    `Add the ${primary} and simmer gently until the flavors meld together perfectly.`,
                    `Season to taste with salt and pepper, and serve warm.`
                ],
                intermediate: [
                    `Build a deep flavor base by gently sweating the ${secondary} until intensely aromatic but not browned.`,
                    `Add the ${primary} and simmer slowly, allowing the sauce to reduce and intensify in flavor.`,
                    `Finish with a touch of fresh herbs or a pat of cold butter for extra richness and shine.`
                ]
            }
        };

        const dishTemplate = templates[dishType] || templates['Classic'];
        return dishTemplate[level] || templates['Classic'][level];
    };

    const generateMultiLevelRecipes = (ings) => {
        const dishType = detectDishType(ings);
        const baseTitle = `${ings[0]} ${dishType === 'Specialty' ? 'Delight' : dishType}`;
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
                desc: `A quick and simple ${dishType.toLowerCase()} dish made with fresh ingredients.`,
                ingredients: detailedIngs,
                phases: [
                    {
                        name: "Getting Ready",
                        steps: [
                            `Prep all your ingredients: ${ings.join(', ')}.`,
                            `Ensure your workspace is clean and you have a large pan or pot ready.`
                        ]
                    },
                    {
                        name: "The Cooking Part",
                        steps: getStepsByDishType(ings, dishType, 'beginner')
                    }
                ]
            },
            intermediate: {
                level: 'Intermediate',
                title: `Gourmet ${baseTitle}`,
                meta: metadata.intermediate,
                desc: `An elevated ${dishType.toLowerCase()} experience with refined techniques and deeper flavors.`,
                ingredients: [...detailedIngs, "1/2 cup White Wine (optional)", "2 tbsp Fresh Parsley, chopped"],
                phases: [
                    {
                        name: "Advanced Prep",
                        steps: [
                            `Focus on consistent knife work for even cooking of the ${ings.slice(0, 3).join(', ')}.`,
                            `Mise en place: have everything measured and ready to go.`
                        ]
                    },
                    {
                        name: "Technical Execution",
                        steps: getStepsByDishType(ings, dishType, 'intermediate')
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
                        <h3 class="recipe-sub">Directions</h3>
                        <ol class="recipe-steps">
                            ${(() => {
                const allSteps = recipe.phases.flatMap(p => p.steps);
                return allSteps.map((step, idx) => `
                                    <li>
                                        <span class="step-label">Step ${idx + 1}</span>
                                        <p class="step-text">${step}</p>
                                    </li>
                                `).join('');
            })()}
                        </ol>
                    </div>
                </div>
            </div>
        `;
    };

    window.displayRecipe = displayRecipe;
});
