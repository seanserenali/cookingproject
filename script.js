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
        flavors: [],
        misc: []
    };

    const ingredientSubtypes = {
        proteins: {
            'Chicken': ['Chicken Thighs', 'Chicken Breast', 'Ground Chicken', 'Whole Chicken'],
            'Beef': ['Ground Beef', 'Flank Steak', 'Beef Chuck', 'Ribeye'],
            'Pork': ['Pork Chops', 'Pork Tenderloin', 'Ground Pork', 'Bacon'],
            'Shrimp': ['Raw Shrimp', 'Cooked Shrimp', 'Jumbo Shrimp'],
            'Salmon': ['Fresh Salmon Fillet', 'Smoked Salmon'],
            'Tofu': ['Firm Tofu', 'Extra Firm Tofu', 'Silken Tofu'],
            'Bacon': ['Pork Bacon', 'Turkey Bacon', 'Thick-cut Bacon'],
            'Egg': ['Chicken Egg', 'Duck Egg', 'Quail Egg']
        },
        carbs: {
            'Pasta': ['Spaghetti', 'Penne', 'Fusilli', 'Macaroni', 'Linguine'],
            'Rice': ['White Rice', 'Brown Rice', 'Basmati', 'Jasmine', 'Arborio'],
            'Cheese': ['Cheddar', 'Mozzarella', 'Parmesan', 'Feta', 'Gruyere'],
            'Milk': ['Whole Milk', '2% Milk', 'Almond Milk', 'Oat Milk'],
            'Flour': ['All-Purpose Flour', 'Whole Wheat Flour', 'Bread Flour', 'Almond Flour'],
            'Cream': ['Heavy Cream', 'Half and Half', 'Sour Cream'],
            'Quinoa': ['White Quinoa', 'Red Quinoa', 'Tri-color Quinoa'],
            'Cornstarch': ['Cornstarch']
        },
        veggies: {
            'Tomato': ['Cherry Tomatoes', 'Roma Tomatoes', 'Crushed Tomatoes', 'Sun-dried Tomatoes'],
            'Onion': ['Yellow Onion', 'Red Onion', 'White Onion', 'Shallots'],
            'Mushroom': ['White Button', 'Cremini', 'Portobello', 'Shiitake'],
            'Bell Pepper': ['Red Bell Pepper', 'Green Bell Pepper', 'Yellow Bell Pepper'],
            'Spinach': ['Fresh Baby Spinach', 'Frozen Spinach'],
            'Broccoli': ['Fresh Broccoli Florets', 'Frozen Broccoli'],
            'Zucchini': ['Green Zucchini', 'Yellow Squash'],
            'Carrot': ['Whole Carrots', 'Baby Carrots', 'Shredded Carrots'],
            'Potato': ['Russet Potatoes', 'Yukon Gold', 'Red Potatoes', 'Sweet Potatoes'],
            'Avocado': ['Hass Avocado', 'Florida Avocado'],
            'Lemon': ['Fresh Lemon', 'Lemon Juice', 'Lemon Zest']
        },
        flavors: {
            'Olive Oil': ['Extra Virgin Olive Oil', 'Light Tasting Olive Oil'],
            'Garlic': ['Fresh Garlic Cloves', 'Garlic Powder', 'Minced Garlic'],
            'Butter': ['Unsalted Butter', 'Salted Butter', 'Vegan Butter'],
            'Salt': ['Kosher Salt', 'Sea Salt', 'Table Salt'],
            'Black Pepper': ['Freshly Ground Black Pepper', 'Pre-ground Black Pepper'],
            'Basil': ['Fresh Basil', 'Dried Basil', 'Thai Basil'],
            'Cilantro': ['Fresh Cilantro', 'Dried Cilantro'],
            'Ginger': ['Fresh Ginger Root', 'Ground Ginger', 'Ginger Paste'],
            'Honey': ['Raw Honey', 'Clover Honey', 'Manuka Honey'],
            'Soy Sauce': ['Regular Soy Sauce', 'Low-Sodium Soy Sauce', 'Tamari'],
            'Chili': ['Chili Flakes', 'Chili Powder', 'Fresh Chili Peppers'],
            'Sriracha': ['Original Sriracha', 'Extra Garlic Sriracha'],
            'Pesto': ['Basil Pesto', 'Sun-dried Tomato Pesto', 'Vegan Pesto']
        },
        misc: {
            'Broth': ['Chicken Broth', 'Beef Broth', 'Vegetable Broth', 'Bone Broth'],
            'Wine': ['White Wine', 'Red Wine', 'Cooking Wine'],
            'Water': ['Tap Water', 'Filtered Water'],
            'Cooking Spray': ['Canola Oil Spray', 'Olive Oil Spray'],
            'Baking Powder': ['Baking Powder'],
            'Yeast': ['Active Dry Yeast', 'Instant Yeast']
        }
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
        for (const [groupCat, subtypesGroup] of Object.entries(ingredientSubtypes)) {
            for (const [broad, specificTypes] of Object.entries(subtypesGroup)) {
                if (titleCase === broad || text.toLowerCase() === broad.toLowerCase()) {
                    openSubtypeModal(broad, specificTypes, groupCat);
                    return;
                }
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

            // Determine category based on its parent section's data attribute
            const category = chip.closest('.category-group').getAttribute('data-category');

            handleAddRequest(text, category);
        });
    });

    generateBtn.addEventListener('click', async () => {
        // Flatten ingredients for existing generation logic
        const allIngredients = [
            ...categorizedIngredients.proteins,
            ...categorizedIngredients.carbs,
            ...categorizedIngredients.veggies,
            ...categorizedIngredients.flavors,
            ...categorizedIngredients.misc
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


        currentRecipes = generateMultiLevelRecipes(allIngredients);
        displayRecipe('beginner');

        generateBtn.disabled = false;
        generateBtn.innerHTML = `<span>Generate Recipe</span> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 0 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 0-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>`;

        // Scroll to recipe
        recipeSection.scrollIntoView({ behavior: 'smooth' });
    });

    const generateSpecificSteps = (ings, level) => {
        const lowerIngs = ings.map(i => i.toLowerCase());
        const has = (keywords) => lowerIngs.some(i => keywords.some(k => i.includes(k)));
        const get = (keywords) => lowerIngs.find(i => keywords.some(k => i.includes(k)));

        // Detect key components
        const hasPasta    = has(['pasta','spaghetti','penne','linguine','fusilli','macaroni','noodle','fettuccine']);
        const hasRice     = has(['rice','risotto']);
        const hasChicken  = has(['chicken']);
        const hasBeef     = has(['beef','steak','ground beef']);
        const hasSalmon   = has(['salmon']);
        const hasShrimp   = has(['shrimp','prawn']);
        const hasPork     = has(['pork','bacon']);
        const hasTuna     = has(['tuna']);
        const hasLamb     = has(['lamb']);
        const hasTofu     = has(['tofu']);
        const hasEgg      = has(['egg']);
        const hasCream    = has(['cream','half and half']);
        const hasTomato   = has(['tomato']);
        const hasGarlic   = has(['garlic']);
        const hasOnion    = has(['onion','shallot']);
        const hasButter   = has(['butter']);
        const hasCheese   = has(['cheese','parmesan','mozzarella','feta','cheddar']);
        const hasSpinach  = has(['spinach','kale','arugula']);
        const hasGreens   = has(['lettuce','spinach','kale','arugula','cabbage']);
        const hasLemon    = has(['lemon','lime']);
        const hasSoy      = has(['soy sauce','tamari']);
        const hasSesame   = has(['sesame']);
        const hasGinger   = has(['ginger']);
        const hasHoney    = has(['honey','maple']);
        const hasBroth    = has(['broth','stock']);
        const hasWine     = has(['wine']);
        const hasMushroom = has(['mushroom']);
        const hasBroccoli = has(['broccoli']);
        const hasAvocado  = has(['avocado']);
        const allIng = ings.slice(0, 6).join(', ');

        // ─── SALMON ──────────────────────────────────────────────────────────────
        if (hasSalmon) {
            const sauce = hasSoy ? 'soy-honey glaze' : hasLemon ? 'lemon butter sauce' : hasCream ? 'cream sauce' : 'seasoned pan drippings';
            const sides = ings.filter(i => !i.toLowerCase().includes('salmon')).slice(0, 3).join(' and ') || 'seasonal vegetables';
            if (level === 'beginner') return [
                `Take the salmon fillets out of the fridge 10–15 minutes before cooking so they're closer to room temperature — this ensures even cooking. Pat both sides completely dry with paper towels, especially the skin. Season generously with ½ tsp salt and ¼ tsp black pepper per fillet.`,
                `Heat a stainless steel or cast iron skillet over medium-high heat for 2 minutes. Add 1 tbsp of olive oil or canola oil and heat until it shimmers. Place the salmon skin-side DOWN — this is important for crispy skin. Press gently with a spatula for the first 10 seconds so the skin makes full contact with the pan. Cook undisturbed for 6–7 minutes, until the flesh turns opaque about ¾ of the way up the fillet.`,
                `Flip the salmon carefully using a fish spatula and cook for another 1–2 minutes on the flesh side. Target an internal temperature of 125–130°F for medium (moist and flaky) or 145°F for fully cooked. ${hasSoy ? 'Mix 2 tbsp soy sauce, 1 tbsp honey, and 1 tsp sesame oil and pour over the salmon during the last minute.' : hasLemon ? 'Add 1 tbsp butter and a squeeze of lemon juice to the pan and spoon it over the salmon.' : 'Squeeze a little lemon juice over the top.'} Rest for 3 minutes before serving over ${sides}.`
            ];
            return [
                `Remove salmon from the fridge 20 minutes before cooking. Score the skin every inch with a sharp knife — this prevents curling. Season with flaky salt, white pepper, and ${hasSoy ? 'a light brush of soy marinade (2 tbsp soy, 1 tsp sesame oil, 1 tsp honey — marinate 10 min)' : 'your spice blend'}. Let the skin dry uncovered on a rack for 5 minutes.`,
                `Heat a heavy stainless or cast iron pan on high for 3 minutes until a drop of water evaporates instantly. Add 1 tbsp high-smoke-point oil. Place salmon skin-down, immediately apply firm pressure with a flat spatula for 15 seconds. Reduce heat to medium-high. Cook skin-side down for 7–8 minutes without touching — the flesh will turn opaque from the bottom up. When only the top ¼ inch looks translucent, flip. Cook flesh-side for just 60–90 seconds. Internal temp should read 120–125°F for restaurant-style medium. Carryover will bring it to 130°F.`,
                `${hasSoy ? 'Meanwhile, simmer 3 tbsp soy sauce, 2 tbsp honey, 1 tsp rice vinegar, and ½ tsp sesame oil in a small pan for 3 minutes until syrupy. Brush over the salmon.' : hasLemon ? 'In the same pan, add 2 tbsp cold butter, 1 minced garlic clove, and juice of half a lemon. Swirl for 90 seconds until emulsified into a glossy sauce.' : 'Deglaze the pan with 2 tbsp white wine and 1 tbsp butter, scraping up the browned bits into a quick pan sauce.'} Rest the salmon on a wire rack for 3 minutes. Serve over ${sides} and spoon the ${sauce} over the top.`
            ];
        }

        // ─── CHICKEN ─────────────────────────────────────────────────────────────
        if (hasChicken) {
            const isCreamy = hasCream || hasCheese;
            const isTomato = hasTomato;
            if (hasPasta) {
                // Chicken Pasta specific
                const pastaType = get(['penne','spaghetti','linguine','fettuccine','macaroni','noodle']) || 'pasta';
                if (level === 'beginner') return [
                    `Fill a large pot with 5 quarts of water, cover, and bring to a full rolling boil over high heat (212°F). Add 1 tbsp of salt — the water should taste salty like the sea. Add the ${pastaType} and cook uncovered, stirring every 2 minutes, for 8–10 minutes until tender but with a slight bite (al dente). Before draining, scoop out 1 cup of cloudy pasta water and set aside. Drain the pasta.`,
                    `Meanwhile, cut the chicken into 1-inch strips or bite-sized pieces. Season with ½ tsp salt, ¼ tsp pepper, and ¼ tsp garlic powder. Heat 1 tbsp olive oil in a large skillet over medium-high heat until shimmering. Add the chicken in a single layer — don't crowd the pan. Cook undisturbed for 3–4 minutes until golden, then flip and cook another 3–4 minutes until the internal temperature reaches 165°F. Remove to a plate.`,
                    `In the same skillet over medium heat, add ${hasGarlic ? '3 minced garlic cloves and sauté 60 seconds until fragrant.' : '1 tbsp butter and heat until foaming.'} ${isCreamy ? 'Pour in 1 cup of heavy cream and bring to a gentle simmer (small bubbles, NOT a hard boil). Simmer 3–4 minutes until slightly thickened. Season with salt, pepper, and a pinch of nutmeg.' : isTomato ? 'Add 1 can (14 oz) crushed tomatoes and simmer 8–10 minutes until the sauce deepens in color and thickens.' : 'Deglaze with ¼ cup pasta water.'} Return the chicken and drained ${pastaType} to the pan. Toss, adding reserved pasta water by the tablespoon until the sauce clings to every piece. ${hasCheese ? 'Finish with ¼ cup grated Parmesan.' : ''} Serve immediately.`
                ];
                return [
                    `Bring 5 quarts of water to a vigorous boil with 1½ tbsp kosher salt. Cook the ${pastaType} exactly 2 minutes LESS than the package time — it finishes cooking in the sauce. Reserve 1 cup pasta water before draining.`,
                    `Pound chicken breasts to an even ¾-inch thickness for consistent cooking. Season well. Sear in a hot skillet with 1 tbsp oil over high heat — 3 min per side without touching — until a deep golden crust forms and internal temp hits 160°F (carryover brings it to 165°F). Slice into strips and rest.`,
                    `Using the same skillet, ${hasGarlic ? 'sauté 4 minced garlic cloves over medium heat 90 seconds until golden, not burnt.' : ''} ${isCreamy ? 'Add 1¼ cups heavy cream and bring to a gentle simmer — never a boil or the cream will break. Reduce for 5 minutes until it coats the back of a spoon. Season with salt, pepper, nutmeg, and a squeeze of lemon.' : isTomato ? 'Add crushed tomatoes, pinch of sugar, and fresh basil. Simmer 12 minutes until the oil separates from the sauce — sign of a great Italian sauce.' : 'Add pasta water and a knob of cold butter.'} Add the under-cooked ${pastaType} to the sauce and finish cooking in the pan over medium heat for 2 minutes, tossing constantly. The pasta absorbs the sauce and the starchy pasta water emulsifies everything into a glossy, restaurant-quality finish. ${hasCheese ? 'Shower generously with Parmesan off the heat.' : ''}`
                ];
            }
            if (level === 'beginner') return [
                `Pat chicken completely dry with paper towels — this is the most important step for a golden sear. Season both sides with 1 tsp kosher salt, ½ tsp black pepper, and any herbs you like (garlic powder, paprika, dried thyme all work well). Let it sit for 10 minutes at room temperature.`,
                `Heat a heavy skillet — cast iron is best — over medium-high heat for 2 minutes. Add 1 tbsp oil and wait for it to shimmer. Lay the chicken away from you in the hot pan. Do NOT move it for 5–6 minutes. The chicken will naturally release when ready. Flip and cook 4–5 more minutes. Use a meat thermometer inserted in the thickest part — it must read 165°F (74°C) to be safe. If it's not there yet, lower heat to medium and cook 2 more minutes.`,
                `Remove chicken to a cutting board and rest 5 minutes — cutting it immediately loses all the juices. ${hasGarlic || hasOnion ? `In the same pan over medium heat, sauté ${hasOnion ? 'the sliced onion' : ''} ${hasGarlic ? 'and minced garlic' : ''} for 3 minutes, scraping up the browned bits (fond) from the bottom — these are packed with flavor.` : ''} ${isTomato ? 'Add crushed tomatoes and simmer 5 minutes for a quick pan sauce.' : isCreamy ? 'Add ¼ cup cream and reduce for 2 minutes.' : 'Add a splash of broth and swirl it into a simple sauce.'} Slice and serve.`
            ];
            return [
                `Dry-brine the chicken: pat dry, season with 1 tsp kosher salt per breast, and set uncovered in the fridge for at least 30 minutes (or up to overnight). This draws moisture out and back in, seasoning the meat deeply and promoting better browning. Take out 20 minutes before cooking.`,
                `Preheat your oven to 400°F for thicker cuts. Heat a cast iron skillet on high until it's smoking hot. Add 1 tbsp avocado or grapeseed oil. Sear the chicken for 3–4 minutes until deeply golden — do NOT touch it. Flip, add 2 tbsp cold butter, ${hasGarlic ? '3 smashed garlic cloves,' : ''} and fresh thyme sprigs. Continuously baste with the foaming butter by tilting the pan for 2 minutes. If over ¾ inch thick, transfer the whole pan to the 400°F oven for 5–7 minutes. Pull at 155°F — carryover heat will bring it to 165°F.`,
                `Rest on a wire rack for 7 minutes. Meanwhile, build a pan sauce: ${hasOnion ? 'add minced shallot, cook 2 min.' : ''} ${hasWine ? 'Deglaze with ¼ cup white wine, reduce by half.' : ''} ${hasBroth ? 'Add ½ cup broth, reduce 3 minutes.' : ''} ${isCreamy ? 'Swirl in 2 tbsp heavy cream.' : ''} Swirl in 1 tbsp cold butter off the heat for a glossy, velvety finish. Spoon over the sliced, rested chicken.`
            ];
        }

        // ─── SHRIMP ──────────────────────────────────────────────────────────────
        if (hasShrimp) {
            const sides = ings.filter(i => !i.toLowerCase().includes('shrimp')).slice(0, 3).join(' and ') || 'pasta or rice';
            if (level === 'beginner') return [
                `Peel and devein the shrimp if not already done. Pat completely dry with paper towels. Season with ½ tsp salt, ¼ tsp black pepper, and ¼ tsp paprika. Shrimp cook very fast — have all your other ingredients prepped before turning on the heat.`,
                `Heat a large skillet over high heat for 90 seconds. Add 1 tbsp butter or olive oil. Add shrimp in a SINGLE layer — don't pile them. Cook exactly 1–2 minutes per side until they curl into a "C" shape and turn pink and opaque. The moment they form a "C" they're done. An "O" shape means overcooked and rubbery. Work in batches if your pan is full.`,
                `${hasGarlic ? 'Add 3 minced garlic cloves to the pan after removing the shrimp and cook 30 seconds.' : ''} ${hasLemon ? 'Squeeze in the juice of 1 lemon and add 1 tbsp butter — swirl the pan to create a quick pan sauce.' : hasSoy ? 'Add 2 tbsp soy sauce and 1 tsp honey — toss to glaze.' : 'Add a splash of broth and 1 tbsp butter for a simple sauce.'} Return the shrimp to the pan, toss to coat, and serve immediately over ${sides}.`
            ];
            return [
                `For maximum flavour, lightly score the back of each shrimp and butterfly them open. Season with salt, white pepper, ${hasSoy ? 'and a tsp of soy sauce' : 'smoked paprika, and garlic powder'}. Arrange them so they'll all hit the pan at once — timing is critical for even cooking.`,
                `Heat a carbon steel or stainless pan on high until it just begins to smoke. Add 1 tbsp high-smoke-point oil. Place shrimp in the pan and press flat with a spatula for 5 seconds of contact. Cook for 60–75 seconds on the first side until the edges turn pink. Flip every shrimp at once. Cook 45–60 seconds. Total time should be under 2½ minutes — they carry over cooking after leaving the pan.`,
                `Remove shrimp immediately. Deglaze the pan with ${hasWine ? '¼ cup white wine — let it bubble and reduce 1 min.' : hasLemon ? 'juice of 1 lemon.'  : '2 tbsp broth.'} ${hasGarlic ? 'Add 2 minced garlic cloves and cook 45 seconds.' : ''} ${hasButter ? 'Swirl in 2 tbsp cold unsalted butter until emulsified and glossy.' : ''} ${hasSoy ? 'Stir in 1 tbsp soy, 1 tsp honey, and ½ tsp sesame oil for an Asian-style glaze.' : ''} Return shrimp to the pan for 10 seconds to coat. Serve over ${sides}.`
            ];
        }

        // ─── BEEF ────────────────────────────────────────────────────────────────
        if (hasBeef) {
            const isGround = lowerIngs.some(i => i.includes('ground'));
            if (level === 'beginner') return [
                `${isGround ? 'Break the ground beef into rough chunks and season with 1 tsp salt and ½ tsp pepper.' : 'Take the beef out of the fridge 20 minutes before cooking. Pat completely dry. Season both sides generously with 1 tsp kosher salt and ½ tsp coarse black pepper — press it into the meat.'}`,
                `${isGround ? 'Heat a skillet over medium-high heat. Add the beef and spread into an even layer. Cook without stirring for 3–4 minutes until browned on the bottom. Break apart and cook another 2–3 minutes until no longer pink. Drain excess fat if needed.' : 'Heat a cast iron skillet on high for 3 minutes. Add 1 tbsp oil. Lay the steak in the pan — it should sizzle loudly. Sear for 3–4 minutes without touching. Flip and sear 2–3 minutes more. For medium-rare, the internal temperature should be 130–135°F. For medium: 140–145°F. Well-done: 160°F.'}`,
                `${isGround ? `${hasOnion ? 'Add diced onion to the pan and cook 3 minutes.' : ''} ${hasTomato ? 'Add crushed tomatoes and simmer 10 minutes.' : ''} Season with salt, pepper, and any spices you like.` : 'Remove the beef and rest it on a cutting board for AT LEAST 5 minutes before slicing — this is non-negotiable. A rested steak is 20% juicier. While it rests, melt 1 tbsp butter in the still-hot pan and spoon it over the steak as it rests.'}`
            ];
            return [
                `${isGround ? 'For full flavour, use 80/20 ground beef — the fat content makes a huge difference. Season with 1½ tsp kosher salt, 1 tsp black pepper, and ½ tsp each of garlic powder and Worcestershire sauce. Mix gently — overworking makes the meat tough.' : 'Temper the steak: remove from fridge 30 minutes before cooking. Season boldly and let the seasoning absorb — pressing the salt in firmly. A proper dry exterior is essential for maximum Maillard reaction (the browning).'}`,
                `${isGround ? `Heat a heavy skillet on medium-high until very hot. Add the beef and press into a flat even layer. Let it cook UNTOUCHED for 4 minutes to develop deep browning. The crust = flavour. Break apart and cook 2 more minutes.` : 'Heat a cast iron skillet on maximum heat for 4 minutes. Add 1 tbsp tallow or high-smoke oil. The beef should make an extremely loud sizzle when it hits — if it doesn\'t, pan isn\'t hot enough. Sear 3 minutes per side for a 1-inch steak. Use an instant-read thermometer: 125°F=rare, 130–135°F=medium-rare, 145°F=medium. Add butter, garlic, and thyme to the pan with 90 seconds left and baste continuously.'}`,
                `${isGround ? `${hasTomato ? 'Add crushed tomatoes, ½ tsp sugar, and fresh basil. Simmer 12 minutes until the oil separates from the sauce — a hallmark of a properly cooked tomato sauce.' : hasOnion ? 'Add onion, cook until caramelized — about 8 minutes on medium heat, stirring every 2 minutes.' : 'Taste and adjust seasoning.'}` : 'Rest the steak on a wire rack (not a cutting board that traps steam) for 7–10 minutes. The internal temp will rise another 5°F during rest. Slice AGAINST the grain at a slight angle — this shortens the muscle fibers making each bite incredibly tender. Drizzle with any resting juices and finish with flaky sea salt.'}`
            ];
        }

        // ─── PORK/BACON ──────────────────────────────────────────────────────────────────
        if (hasPork) {
            if (level === 'beginner') return [
                `Pat the pork dry and season all sides with 1 tsp salt and ½ tsp black pepper. Optionally add garlic powder and paprika. For even cooking, bring the pork to room temperature by setting it out 15 minutes before cooking.`,
                `Heat a skillet over medium-high heat. Add 1 tbsp oil. Sear the pork for 4–5 minutes per side until golden brown. The USDA safe internal temperature for pork is 145°F (63°C). Use a meat thermometer in the thickest part. If it's thick (over 1 inch), lower heat to medium and cover for the last few minutes.`,
                `Remove the pork and let it rest for 5 minutes. In the same pan over medium heat, ${hasBroth ? 'add ¼ cup broth and deglaze the pan, scraping up all the browned bits.' : hasApple ? 'add sliced apple and cook 3 minutes until softened.' : 'add 1 tbsp butter and a splash of water to make a simple pan sauce.'} ${hasGarlic ? 'Add 2 minced garlic cloves and cook 1 minute.' : ''} Spoon the pan sauce over the sliced pork.`
            ];
            return [
                `For pork chops: brine for extra juiciness — dissolve 2 tbsp salt and 1 tbsp sugar in 2 cups warm water, add ice to cool, and soak the pork for 30–60 minutes. Pat completely dry before cooking. For pork shoulder or shoulder steaks, season aggressively with a dry rub.`,
                `Preheat oven to 400°F. Sear the pork in a cast iron skillet over high heat with 1 tbsp oil — 3 minutes per side without moving to develop a deep crust. Baste with 1 tbsp butter and 2 smashed garlic cloves for the last minute. Transfer the pan to the oven and roast until the internal temperature hits 140°F (safe carryover to 145°F). Thick chops typically need 6–8 minutes in the oven.`,
                `Rest for 8 minutes tented loosely with foil. Make a pan sauce: add shallots to the drippings, cook 2 minutes, deglaze with ${hasWine ? '¼ cup white wine and reduce 2 minutes' : '¼ cup broth'}, add 1 tbsp Dijon mustard and 2 tbsp cold butter off the heat. Adjust seasoning with salt, pepper, and a squeeze of lemon. Spoon generously over the sliced pork.`
            ];
        }

        // ─── TOFU ────────────────────────────────────────────────────────────────
        if (hasTofu) {
            if (level === 'beginner') return [
                `Press the tofu first — this is essential. Wrap the block in a clean kitchen towel, place a heavy pan on top, and press for 20–30 minutes to remove excess moisture. Without pressing, tofu won't crisp up. Cut into 1-inch cubes. Pat dry one final time.`,
                `Heat 2 tbsp oil in a non-stick or well-seasoned cast iron skillet over medium-high heat. Add the tofu in a single layer — don't stir for 3–4 minutes until the bottom turns golden and crispy. Flip each cube and brown another 2–3 minutes per side. Season with ½ tsp salt and ¼ tsp garlic powder while cooking.`,
                `${hasSoy ? 'Mix 2 tbsp soy sauce, 1 tbsp sesame oil, 1 tbsp honey, and 1 tsp cornstarch. Pour over the tofu in the pan and toss over high heat for 2 minutes until glazed and caramelized.' : hasTomato ? 'Add crushed tomatoes and simmer 5 minutes.' : hasGarlic ? 'Add 3 minced garlic cloves and cook 1 minute, then deglaze with a splash of broth.' : 'Add your favourite sauce and toss to coat.'} Serve immediately while crispy.`
            ];
            return [
                `For maximum crispiness, freeze the tofu overnight then thaw completely — this changes the protein structure, creating a chewier, more porous texture that absorbs marinades beautifully. Press for 30 minutes. Cut into equal cubes and toss with 1 tbsp cornstarch, ½ tsp salt, and ¼ tsp white pepper — the cornstarch creates a restaurant-style crust.`,
                `Heat 2 tbsp oil in a wok or cast iron skillet until it's very hot — just at the smoke point (400°F). Add the tofu and DO NOT TOUCH for 3 minutes. Each side should be deep golden and slightly charred in spots. Work in batches if needed — crowding causes steaming not searing.`,
                `${hasSoy ? 'Build the glaze: 3 tbsp soy sauce, 1 tbsp rice vinegar, 1 tbsp honey, 1 tsp sesame oil, 1 tsp cornstarch, and ½ tsp chili flakes. Pour into the pan and toss over high heat for 90 seconds until the sauce thickens and the tofu is glazed.' : hasGarlic || hasGinger ? 'Add 3 minced garlic cloves and 1 tsp fresh grated ginger, stir-fry 30 seconds, then deglaze with 3 tbsp soy sauce and 1 tbsp oyster sauce.' : 'Add your sauce and cook 2 minutes.'} Finish with sesame seeds and fresh scallions. The contrast of the crispy outside and soft inside is the hallmark of great tofu.`
            ];
        }

        // ─── EGGS ────────────────────────────────────────────────────────────────
        if (hasEgg && !hasChicken) {
            if (level === 'beginner') return [
                `Crack eggs into a small bowl first — never directly into the pan — so you can spot any shell fragments. For scrambled: whisk with a pinch of salt and 1 tbsp milk until fully combined. For fried: keep whole.`,
                `For scrambled: Heat a non-stick pan over LOW heat (this is the secret — too high and they turn rubbery). Add 1 tbsp butter and let it melt gently. Pour in the eggs and stir slowly and constantly with a spatula, pushing from the edges inward. Remove from heat when still slightly underdone — residual heat finishes them (about 2–3 minutes total). For fried: heat 1 tbsp butter over medium-low until foamy. Crack egg in. Cook 3–4 minutes until whites are set but yolk is still runny, or cover 1 minute for over-easy.`,
                `Season with flaky salt and freshly ground pepper. ${hasCheese ? 'Fold in grated cheese at the very end for scrambled eggs, or top a fried egg just before serving.' : ''} ${hasAvocado ? 'Serve alongside sliced avocado seasoned with salt, chili flakes, and lemon juice.' : ''} Serve immediately — eggs wait for no one.`
            ];
            return [
                `For the perfect scrambled eggs, use eggs at room temperature (take out 10 min early). Whisk 3 eggs with 1 tbsp crème fraîche or cold butter and a pinch of salt — don't add milk, it dilutes flavour. For a frittata or omelette, pre-grate your ${hasCheese ? 'cheese' : 'fillings'} and have everything ready before you start.`,
                `For fine scrambled eggs: Place a non-stick pan over the lowest possible heat. Add 1 tbsp butter. Add the egg mixture and stir CONTINUOUSLY with a rubber spatula using figure-eight motions. Every 10 seconds, pull the pan off the heat for 5 seconds to control temperature — the eggs should never sizzle. Total time: 5–7 minutes. Pull off heat just before they look fully done — the residual heat finishes them to silky perfection.`,
                `${hasCheese ? 'Fold in cheese off the heat — it melts from the warmth of the eggs without getting grainy.' : ''} ${hasAvocado ? 'Plate alongside avocado smashed with lemon, salt, and chili flakes on toasted bread.' : ''} Season with flaky Maldon salt, black pepper, and fresh chives. The ideal scrambled egg should glisten and be creamy — almost soft set — with no rubbery texture.`
            ];
        }

        // ─── PASTA (no special protein) ──────────────────────────────────────────
        if (hasPasta) {
            const pastaType = get(['penne','spaghetti','linguine','fettuccine','macaroni','noodle','fusilli']) || 'pasta';
            const sauce = hasCream ? 'cream sauce' : hasTomato ? 'tomato sauce' : 'olive oil sauce';
            if (level === 'beginner') return [
                `Fill a large pot with 5 quarts of water and bring to a FULL rolling boil on high heat (212°F). This takes about 10–15 minutes — don't rush it by starting with less water. Once boiling, add 1 heaped tablespoon of kosher salt. The water should taste like the sea. Add the ${pastaType} and stir immediately so it doesn't stick. Cook for 8–10 minutes, stirring every 2 minutes.`,
                `Test a piece 1 minute before the package time — bite it. It should have no crunch but a slight firmness in the very center. Before draining, use a mug to scoop out 1 full cup of cloudy pasta water and set it aside — this is liquid gold for your sauce. Drain the pasta but do NOT rinse it. Rinsing washes off the starch that helps sauce cling.`,
                `${hasTomato ? 'In a large skillet over medium heat, warm 2 tbsp olive oil. Add crushed tomatoes, a pinch of sugar, salt, and torn fresh basil. Simmer 10–12 minutes until thickened.' : hasCream ? 'In a skillet over medium heat, melt 1 tbsp butter. Add minced garlic and cook 1 minute. Pour in 1 cup heavy cream and simmer gently (not boiling) for 4 minutes until slightly thickened.' : hasGarlic ? 'In a large skillet over medium-low heat, warm 4 tbsp olive oil with 4 minced garlic cloves for 2–3 minutes until gently golden — do NOT let garlic brown.' : 'Warm a large skillet over medium heat with 3 tbsp olive oil.'} Add the drained ${pastaType} directly to the sauce and toss vigorously over medium heat for 2 minutes, adding pasta water by the tablespoon until the sauce coats every strand. ${hasCheese ? 'Remove from heat and stir in ¼ cup finely grated Parmesan.' : ''} Serve immediately in warm bowls.`
            ];
            return [
                `Cook the ${pastaType} in heavily salted boiling water (212°F, ratio: 1 tbsp salt per 4 quarts water) exactly 2 minutes LESS than the package time — it finishes in the sauce and absorbs the flavors. Reserve 1½ cups of starchy pasta cooking water before draining.`,
                `${hasTomato ? 'Build the sauce: heat 3 tbsp olive oil in a wide skillet, add 5 minced garlic cloves and a pinch of chili flakes over medium heat. Cook until garlic is pale gold — 2 minutes. Add 1 can San Marzano tomatoes — crush them by hand as they go in. Add a pinch each of sugar and salt. Simmer on low for 20 minutes, stirring occasionally, until the oil separates slightly on the surface — this is the sign of a fully cooked Italian sauce.' : hasCream ? 'In a wide skillet over medium heat, cook shallots in butter 3 minutes. Add 1 cup cream, bring to a bare simmer — never a full boil or it separates. Reduce 5 minutes until it coats a spoon. Season with salt, white pepper, and a grating of nutmeg.' : hasGarlic ? 'In a wide skillet over medium-low, warm 5 tbsp extra virgin olive oil and 5 minced garlic cloves. Cook very gently — 3-4 minutes total — until garlic turns pale gold. Low heat is the key. Remove from heat.' : ''}`,
                `Add the under-cooked ${pastaType} directly into the sauce with ¼ cup pasta water. Toss over medium heat for 2–3 minutes, adding pasta water in small splashes as needed. The starch in the water bonds with the fat in the sauce, creating an emulsified, glossy coating that clings to every piece. ${hasCheese ? 'Remove from heat entirely before adding freshly grated Parmesan — adding cheese while too hot causes it to clump rather than melt smoothly.' : ''} Plate immediately in warmed bowls. Finish with a crack of black pepper and a drizzle of the best olive oil you own.`
            ];
        }

        // ─── FALLBACK / GENERAL ─────────────────────────────────────────────────
        const primary = ings[0] || 'the main ingredient';
        const secondary = ings.slice(1, 4).join(', ') || 'supporting ingredients';
        if (level === 'beginner') return [
            `Prep all your ingredients before turning on any heat — chop, dice, and measure everything. Cut ${primary} into even-sized pieces for uniform cooking. Season generously with salt and pepper. Having everything ready is the single most important habit for stress-free cooking.`,
            `Heat a pan over medium heat (around 325–350°F). Add 1–2 tbsp of oil or butter. Add the ${primary} first and cook, stirring every minute, for 5–7 minutes. Then add the ${secondary} and cook together for another 5 minutes, adjusting heat if things are browning too fast. You're looking for a gentle sizzle — not a loud roar.`,
            `Taste as you go and season with salt, pepper, and any herbs or sauces that complement the dish. If the pan looks dry at any point, add a splash of water or broth. Simmer on low heat (185–200°F) until everything is cooked through and the flavors have melded, about 10–15 minutes more. Serve hot.`
        ];
        return [
            `Mise en place: prepare every ingredient completely before cooking begins. Cut ${primary} into uniform, professional-sized pieces. Marinate or dry-brine in advance if time allows. The best restaurant dish starts with 15 minutes of careful preparation.`,
            `Build layers of flavor: start with aromatics (${hasGarlic ? 'garlic' : hasOnion ? 'onion' : 'your base flavors'}) in a heavy-bottomed pan over medium heat. Build a fond (browned bits on the pan bottom) and deglaze with ${hasWine ? 'wine' : hasBroth ? 'broth' : 'water'} to capture those deep flavors. Add ${primary} at the right moment — proteins go in a hot pan for a sear, vegetables go in based on cooking time needed.`,
            `Finish with balance: taste and adjust salt first, then acid (a squeeze of lemon or splash of vinegar brightens every dish), then fat (a tablespoon of cold butter swirled in off the heat adds richness and gloss). Garnish with fresh herbs. The difference between a good dish and a great one is always in these final adjustments.`
        ];
    };





    const generateMultiLevelRecipes = (ings) => {
        const lowerIngs = ings.map(i => i.toLowerCase());
        const has = (kw) => lowerIngs.some(i => kw.some(k => i.includes(k)));
        const protein = has(['salmon']) ? 'Salmon' : has(['chicken']) ? 'Chicken' : has(['beef','steak']) ? 'Beef' : has(['shrimp']) ? 'Shrimp' : has(['pork','bacon']) ? 'Pork' : has(['tofu']) ? 'Tofu' : has(['egg']) ? 'Egg' : has(['pasta','spaghetti','penne','noodle']) ? 'Pasta' : ings[0];
        const baseTitle = `${protein} with ${ings.filter(i => !i.toLowerCase().includes(protein.toLowerCase())).slice(0,2).join(' & ') || 'Fresh Ingredients'}`;
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
                        steps: generateSpecificSteps(ings, 'beginner')
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
                        steps: generateSpecificSteps(ings, 'intermediate')
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
                <div class="recipe-image-wrapper">
                    <img
                        class="recipe-hero-img"
                        src="https://source.unsplash.com/800x400/?food,${encodeURIComponent(recipe.title)},cooking,gourmet"
                        alt="${recipe.title}"
                        onerror="this.src='https://source.unsplash.com/800x400/?food,cooking,meal'"
                    />
                    <div class="recipe-image-overlay">
                        <h2 class="recipe-title-overlay">${recipe.title}</h2>
                    </div>
                </div>
                <div style="padding: 2rem;">
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
            </div>
        `;
    };

    window.displayRecipe = displayRecipe;
});
