import { recipes } from "../data/recipes.js";
import {
    ingredientSortedArray, applianceSortedArray, ustensilSortedArray
} from "../scripts/search.js";

const recipesData = recipes;
const cardDeck = document.querySelector(".card-deck");
const card1 = document.querySelectorAll(".col-card");
let ingredientsTab = [];
let uniqueIngredients = [];
let ingredientsTab2 = [];
let appliancesTab = [];
let uniqueAppliances = [];
let ustensilsTab = [];
let ustensilsTab2 = [];
let uniqueUstensils = [];
let appTab = [];
let ingTab = [];
let ustTab = [];
const searchBar2 = document.querySelector("#searchbar2");
const searchBar3 = document.querySelector("#searchbar3");
const searchBar4 = document.querySelector("#searchbar4");
const tagsDisplay = document.querySelector(".tags-display");


// Recipes construct
function recipesFactory(data) {
    const { id, name, servings, ingredients,
        time, description, appliance, ustensils } = data;
    appliancesTab.push(appliance);
    ustensilsTab.push(ustensils);
    ingredientsTab2.push(id, ingredients);


    function getRecipeCardDom() {
        const div4 = document.createElement('div');
        div4.className = "col mx-auto flex-grow-0 col-card";

        const div5 = document.createElement('div');
        div5.className = "image-card";

        const div6 = document.createElement('div');
        div6.className = "card-body";

        const div7 = document.createElement('div');
        div7.className = "row d-flex justify-content-between align-items-center";

        const div8 = document.createElement('div');
        div8.className = "card-title";
        div8.innerHTML = `<p>${name}</p>`;

        const div1 = document.createElement('div');
        div1.className = "row card-text time-card align-items-center ";
        div1.innerHTML = `<img src="assets/icons/clock.svg" alt="" />
        <p>${time} min</p>`;

        const div10 = document.createElement('div');
        div10.className = "row";

        const div2 = document.createElement('div');
        div2.className = "card-text text-left-card";

        formatIngredients(ingredients, div2);

        const div3 = document.createElement('div');
        div3.className = "card-text text-right-card";
        div3.innerHTML = `<p>${description}</p>`;

        div4.appendChild(div5);
        div4.appendChild(div6);
        div6.appendChild(div7);
        div7.appendChild(div8);
        div7.appendChild(div1);
        div6.appendChild(div10);
        div10.appendChild(div2);
        div10.appendChild(div3);

        return (div4);
    }
    return { getRecipeCardDom };
}
recipesDisplay(recipesData);
ingredientsPrincipalSearchDisplay(ingTab, recipesData);
appliancesPrincipalSearchDisplay(appTab, recipesData);
ustensilsPrincipalSearchDisplay(ustTab, recipesData);


// Remove recipes data after search
function removeRecipes(recipesData, elemt, nb) {
    console.log('recipesData:', recipesData)
    switch (nb) {
        case 1:
            ingTab.push(elemt.value);
            break;
        case 2:
            appTab.push(elemt.value);
            break;
        case 3:
            ustTab.push(elemt.value);
            break;
    }

    //  console.log('recipesData:', recipesData)
    const card1 = document.querySelectorAll(".col-card");
    card1.forEach(item => {
        item.remove();
    })
    const ingredientItem = document.querySelectorAll(".ingredient-item");
    ingredientItem.forEach(item => {
        item.remove();
    })
    const applianceItem = document.querySelectorAll(".appliance-item");
    applianceItem.forEach(item => {
        item.remove();
    })
    const ustensilItem = document.querySelectorAll(".ustensil-item");
    ustensilItem.forEach(item => {
        item.remove();
    })
    ingredientsTab = [];
    ingredientsTab2 = [];
    appliancesTab = [];
    ustensilsTab = [];
    ustensilsTab2 = [];
    recipesDisplay(recipesData);
    ingredientsPrincipalSearchDisplay(ingTab, recipesData)
    appliancesPrincipalSearchDisplay(appTab, recipesData);
    ustensilsPrincipalSearchDisplay(ustTab, recipesData);
}

// Call the recipes construct
function recipesDisplay(recipesData) {
    recipesData.forEach(recipe => {
        const recipeModel = recipesFactory(recipe);
        const cardDom = recipeModel.getRecipeCardDom();
        cardDeck.appendChild(cardDom);
    })
}

// formating ingrédients in recipes
function formatIngredients(ingredients, div2) {
    for (let ingredient of ingredients) {
        ingredientsTab.push(ingredient.ingredient);

        if (ingredient.quantity === undefined) {
            ingredient.quantity = "";
        }
        if (ingredient.unit === undefined) {
            ingredient.unit = "";
        }
        if (ingredient.unit === "cuillères à soupe" || ingredient.unit === "cuillère à soupe"
            || ingredient.unit === "cuillères à café" || ingredient.unit === "cuillère à café") {
            ingredient.unit = "cuillères";
        }
        if (ingredient.unit === "grammes") {
            ingredient.unit = "g";
        }
        const p = document.createElement('p');
        p.innerHTML = `${ingredient.ingredient}:<span>
        ${ingredient.quantity}${ingredient.unit}</span>`;
        div2.appendChild(p);
    }
}

// Remove duplicate ingredients
function ingredientsPrincipalSearchDisplay(ingTab, recipesData) {
    console.log("fonction ingredientsPrincipalsearchDisplay")
    if (ingTab.length > 0) {
        ingTab.forEach(elem => {
            ingredientsTab = ingredientsTab.filter(ele => ele !== elem);
        })
    }
    uniqueIngredients = [...new Set(ingredientsTab)]
    ingredientsDisplay(uniqueIngredients, recipesData);
}

// Remove ingredients after secondary Search
function ingredientsSecondarySearchDisplay(ingredientSearchTab) {
    console.log("fonction ingredientsSecondarySearchDisplay")
    const ingredientItem = document.querySelectorAll(".ingredient-item");
    ingredientItem.forEach(item => {
        item.remove();
    })
    ingredientsDisplay(ingredientSearchTab, recipesData);
}

// Ingredients display
function ingredientsDisplay(sortedIngredients, recipesData) {
    sortedIngredients.forEach(ingredient => {
        const ingredientsMenu = document.querySelector(".ingredients-menu");
        const div = document.createElement("div");
        div.className = "ingredient-item";
        div.innerHTML = `<button class="ingredient-btn"
        type="button" value="${ingredient}">${ingredient}</button>`;
        ingredientsMenu.appendChild(div);
    })
    const ingredientItem = document.querySelectorAll(".ingredient-btn");
    ingredientItem.forEach(item => {
        item.addEventListener("click", function (e) {
            ingredientSortedArray(recipesData, item);
            ingredientTagDisplay(item);
        })
    })
}

// ingredient tag display
function ingredientTagDisplay(item) {
    const div = document.createElement("div");
    div.className = "ingredient-tag";
    const div1 = document.createElement("div");
    div1.className = "ingredient-value";
    div1.innerHTML = `${item.value}`;
    const div2 = document.createElement("div");
    div2.className = "ingredient-close";
    div2.innerHTML = `<img src="assets/icons/tag-close.svg" alt="close" class="ingredient-tag-close"/>`;
    tagsDisplay.appendChild(div);
    div.appendChild(div1);
    div.appendChild(div2);
    document.querySelector(".tags-display").style.display = "flex";
    document.querySelectorAll(".ingredient-tag-close").forEach((item1) => item1.addEventListener("click", function (e) {
        ingredientTagClose();
    }))
}

// Close ingredients tags
function ingredientTagClose() {
    document.querySelectorAll(".ingredient-tag").forEach(item => {
        item.remove();
    });
    ingTab = [];
    searchBar2.value = "";
    console.log('searchBar2.value:', searchBar2.value)
    removeRecipes(recipes);
}

// Remove duplicate appliances
function appliancesPrincipalSearchDisplay(appTab, recipesData) {
    if (appTab.length > 0) {
        appTab.forEach(elem => {
            appliancesTab = appliancesTab.filter(ele => ele !== elem);
        })
    }
    uniqueAppliances = [...new Set(appliancesTab)];
    appliancesDisplay(uniqueAppliances, recipesData);
}
// Remove appliances after secondary Search
function appliancesSecondarySearchDisplay(applianceSearchTab) {
    const applianceItem = document.querySelectorAll(".appliance-item");
    applianceItem.forEach(item => {
        item.remove();
    })
    appliancesDisplay(applianceSearchTab, recipesData);
}

// Appliances display
function appliancesDisplay(sortedAppliances, recipesData) {
    sortedAppliances.forEach(appliance => {
        const appliancesMenu = document.querySelector(".appliances-menu");
        const div = document.createElement("div");
        div.className = "appliance-item";
        div.innerHTML = `<button class="appliance-btn"
        type="button" value="${appliance}">${appliance}</button>`;
        appliancesMenu.appendChild(div);
    })
    const applianceItem = document.querySelectorAll(".appliance-btn");
    applianceItem.forEach(item => {
        item.addEventListener("click", function (e) {
            applianceSortedArray(recipesData, item);
            applianceTagDisplay(recipesData, item, sortedAppliances);
        })
    })
}

// Appliance tag display
function applianceTagDisplay(appliancesRecipes, item, sortedAppliances) {
    // if (!applianceTagOn) {
    const div = document.createElement("div");
    div.className = "appliance-tag";
    const div1 = document.createElement("div");
    div1.className = "appliance-value";
    div1.innerHTML = `${item.value}`;
    const div2 = document.createElement("div");
    div2.className = "appliance-close";
    div2.innerHTML = `<img src="assets/icons/tag-close.svg" alt="close" class="appliance-close-tag" />`;
    tagsDisplay.appendChild(div);
    div.appendChild(div1);
    div.appendChild(div2);
    document.querySelector(".tags-display").style.display = "flex";
    document.querySelectorAll(".appliance-close-tag").forEach((item2) => item2.addEventListener("click", function (e) {
        applianceTagClose();
    }))
}

// Close appliances tags
function applianceTagClose() {
    document.querySelectorAll(".appliance-tag").forEach(item => {
        item.remove();
    })
    appTab = [];
    searchBar3.value = "";
    removeRecipes(recipes);
}

// Remove duplicate ustensils
function ustensilsPrincipalSearchDisplay(ustTab, recipesData) {
    for (let ustensilsValue of ustensilsTab) {
        for (let ustensilValue of ustensilsValue) {
            ustensilsTab2.push(ustensilValue);
        }
    }
    if (ustTab.length > 0) {
        ustTab.forEach(elem => {
            ustensilsTab2 = ustensilsTab2.filter(ele => ele !== elem);
        })
    }
    uniqueUstensils = [...new Set(ustensilsTab2)];
    ustensilsDisplay(uniqueUstensils, recipesData);
}

// Remove ustensils after secondary Search
function ustensilsSecondarySearchDisplay(ustensilSearchTab) {
    const ustensilItem = document.querySelectorAll(".ustensil-item");
    ustensilItem.forEach(item => {
        item.remove();
    })
    ustensilsDisplay(ustensilSearchTab, recipesData);
}

// Ustensils display
function ustensilsDisplay(sortedUstensils, recipesData) {
    sortedUstensils.forEach(ustensil => {
        const ustensilsMenu = document.querySelector(".ustensils-menu");
        const div = document.createElement("div");
        div.className = "ustensil-item";
        div.innerHTML = `<button class="ustensil-btn"
         type="button" value="${ustensil}">${ustensil}</button>`;
        ustensilsMenu.appendChild(div);
    })
    const ustensilItem = document.querySelectorAll(".ustensil-btn");
    ustensilItem.forEach(item => {
        item.addEventListener("click", function (e) {
            ustensilSortedArray(recipesData, item);
            ustensilTagDisplay(recipesData, item, sortedUstensils);
        })
    })
}

// Ustensils tag display
function ustensilTagDisplay(ustensilsRecipes, item, sortedUstensils) {
    const div = document.createElement("div");
    div.className = "ustensil-tag";
    const div1 = document.createElement("div");
    div1.className = "ustensil-value";
    div1.innerHTML = `${item.value}`;
    const div2 = document.createElement("div");
    div2.className = "ustensil-close";
    div2.innerHTML = `<img src="assets/icons/tag-close.svg" alt="close" class="ustensil-tag-close"/>`;
    tagsDisplay.appendChild(div);
    div.appendChild(div1);
    div.appendChild(div2);
    document.querySelector(".tags-display").style.display = "flex";
    document.querySelectorAll(".ustensil-tag-close").forEach((item3) => item3.addEventListener("click", function (e) {
        ustensilTagClose();
    }))
}

// Close ustensils tags
function ustensilTagClose() {
    const ustensilTagClose = document.querySelector(".ustensilCloseTag");
    document.querySelectorAll(".ustensil-tag").forEach(item => {
        item.remove();
    })
    ustTab = [];
    searchBar4.value = "";
    removeRecipes(recipes);
}

export {
    removeRecipes, uniqueIngredients, uniqueAppliances,
    ingredientsSecondarySearchDisplay, appliancesSecondarySearchDisplay,
    uniqueUstensils, ustensilsSecondarySearchDisplay
};



