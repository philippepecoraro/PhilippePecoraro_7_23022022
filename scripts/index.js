import { recipes } from "../data/recipes.js";
import { ingredientSortedArray, applianceSortedArray, ustensilSortedArray } from "../scripts/search.js";

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
const ingredientsSelection = document.querySelector(".ingredients-selection");
const ingredientsDropdown = document.querySelector(".ingredients-dropdown");
const appliancesSelection = document.querySelector(".appliances-selection");
const appliancesDropdown = document.querySelector(".appliances-dropdown");
const ustensilsDropdown = document.querySelector(".ustensils-dropdown");
const ustensilsSelection = document.querySelector(".ustensils-selection");

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
ingredientsPrincipalSearchDisplay();
appliancesPrincipalSearchDisplay();
ustensilsPrincipalSearchDisplay();

// Remove recipes data after search
function removeRecipes(recipesData) {
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
    ingredientsPrincipalSearchDisplay()
    appliancesPrincipalSearchDisplay();
    ustensilsPrincipalSearchDisplay();
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
function ingredientsPrincipalSearchDisplay() {
    uniqueIngredients = [...new Set(ingredientsTab)]
    ingredientsDisplay(uniqueIngredients);
}

// Remove ingredients after secondary Search
function ingredientsSecondarySearchDisplay(ingredientSearchTab) {
    const ingredientItem = document.querySelectorAll(".ingredient-item");
    ingredientItem.forEach(item => {
        item.remove();
    })
    ingredientsDisplay(ingredientSearchTab);
}

// Ingredients display
function ingredientsDisplay(sortedIngredients) {
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
    div2.innerHTML = `<img src="assets/icons/tag-close.svg" alt="close" class="closeTag"/>`;
    div.appendChild(div1);
    div.appendChild(div2);
    ingredientsSelection.insertBefore(div, ingredientsDropdown);
}

// Remove duplicate appliances
function appliancesPrincipalSearchDisplay() {
    uniqueAppliances = [...new Set(appliancesTab)];
    appliancesDisplay(uniqueAppliances);
}

// Remove appliances after secondary Search
function appliancesSecondarySearchDisplay(applianceSearchTab) {
    const applianceItem = document.querySelectorAll(".appliance-item");
    applianceItem.forEach(item => {
        item.remove();
    })
    appliancesDisplay(applianceSearchTab);
}

// Appliances display
function appliancesDisplay(sortedAppliances) {
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
            applianceTagDisplay(item);
        })
    })
}

// Appliance tag display
function applianceTagDisplay(item) {
    const div = document.createElement("div");
    div.className = "appliance-tag";
    const div1 = document.createElement("div");
    div1.className = "appliance-value";
    div1.innerHTML = `${item.value}`;
    const div2 = document.createElement("div");
    div2.className = "appliance-close";
    div2.innerHTML = `<img src="assets/icons/tag-close.svg" alt="close" />`;
    div.appendChild(div1);
    div.appendChild(div2);
    appliancesSelection.insertBefore(div, appliancesDropdown);
}

// Remove duplicate ustensils
function ustensilsPrincipalSearchDisplay() {
    for (let ustensilsValue of ustensilsTab) {
        for (let ustensilValue of ustensilsValue) {
            ustensilsTab2.push(ustensilValue);
        }
    }
    uniqueUstensils = [...new Set(ustensilsTab2)];
    ustensilsDisplay(uniqueUstensils);
}

// Remove ustensils after secondary Search
function ustensilsSecondarySearchDisplay(ustensilSearchTab) {
    const ustensilItem = document.querySelectorAll(".ustensil-item");
    ustensilItem.forEach(item => {
        item.remove();
    })
    ustensilsDisplay(ustensilSearchTab);
}

// Ustensils display
function ustensilsDisplay(sortedUstensils) {
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
            ustensilTagDisplay(item);
        })
    })
}

// Ustensils tag display
function ustensilTagDisplay(item) {
    const div = document.createElement("div");
    div.className = "ustensil-tag";
    const div1 = document.createElement("div");
    div1.className = "ustensil-value";
    div1.innerHTML = `${item.value}`;
    const div2 = document.createElement("div");
    div2.className = "ustensil-close";
    div2.innerHTML = `<img src="assets/icons/tag-close.svg" alt="close" />`;
    div.appendChild(div1);
    div.appendChild(div2);
    ustensilsSelection.insertBefore(div, ustensilsDropdown);
}

export {
    removeRecipes, uniqueIngredients, uniqueAppliances,
    ingredientsSecondarySearchDisplay, appliancesSecondarySearchDisplay,
    uniqueUstensils, ustensilsSecondarySearchDisplay
};



