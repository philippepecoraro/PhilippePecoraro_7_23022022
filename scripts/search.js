import {
    removeRecipes, uniqueIngredients, uniqueAppliances, uniqueUstensils,
    ingredientsSecondarySearchDisplay, appliancesSecondarySearchDisplay,
    ustensilsSecondarySearchDisplay, recipeInit, tagRemove, ingredientsTagItem
} from "../scripts/index.js"
import { recipes } from "../data/recipes.js";

const ingredientsSelect = document.querySelector(".ingredients-select");
const appliancesSelect = document.querySelector(".appliances-select");
const ustensilsSelect = document.querySelector(".ustensils-select")
const ingredientsDropdown = document.querySelector(".ingredients-dropdown");
const appliancesDropdown = document.querySelector(".appliances-dropdown");
const ustensilsDropdown = document.querySelector(".ustensils-dropdown");
const ingredientsMenu = document.querySelector(".ingredients-menu");
const appliancesMenu = document.querySelector(".appliances-menu");
const ustensilsMenu = document.querySelector(".ustensils-menu");
const ingredientsDropdownClose = document.querySelector(".ingredients-dropdown-close");
const appliancesDropdownClose = document.querySelector(".appliances-dropdown-close");
const ustensilsDropdownClose = document.querySelector(".ustensils-dropdown-close");
const appliancesSelection = document.querySelector(".appliances-selection");
const searchBar = document.querySelector("#searchbar");
let searchFinalTab = [];
let ingredientSearchTab = [];
let applianceSearchTab = [];
let ustensilSearchTab = [];
let availableIngredients2 = [];
let availableAppliances2 = [];
let availableUstensils2 = [];
let ingredients2 = [];
let appliance2 = [];
let ustensils2 = [];
const ustensilsSelection = document.querySelector(".ustensils-selection");


// Open ingrédients dropdown
let dropdownIngredientsMenuBoolean = false;
function dropdownIngredientsMenu(e) {
    e.preventDefault();
    if (!dropdownAppliancesMenuBoolean && !dropdownUstensilsMenuBoolean) {
        ingredientsDropdown.style.display = "block";
        ingredientsMenu.style.display = "flex";
        ingredientsDropdownClose.style.display = "block";
        ingredientsSelect.style.display = "none";
        appliancesSelection.style.marginLeft = "520px";
        dropdownIngredientsMenuBoolean = true;
    }
}
ingredientsSelect.addEventListener("click", dropdownIngredientsMenu);

// Close ingrédients dropdown
function dropdownIngredientsMenuClose(e) {
    e.preventDefault();
    ingredientsDropdown.style.display = "none";
    ingredientsMenu.style.display = "none";
    ingredientsDropdownClose.style.display = "none";
    ingredientsSelect.style.display = "block";
    appliancesSelection.style.marginLeft = "15px";
    dropdownIngredientsMenuBoolean = false;
}
ingredientsDropdownClose.addEventListener("click", dropdownIngredientsMenuClose)

// Open appliances dropdown
let dropdownAppliancesMenuBoolean = false;
function dropdownAppliancesMenu(e) {
    e.preventDefault();
    if (!dropdownIngredientsMenuBoolean && !dropdownUstensilsMenuBoolean) {
        appliancesDropdown.style.display = "block";
        appliancesMenu.style.display = "flex";
        appliancesDropdownClose.style.display = "block";
        appliancesSelect.style.display = "none";
        ustensilsSelection.style.marginLeft = "520px";
        dropdownAppliancesMenuBoolean = true;
    }
}
appliancesSelect.addEventListener("click", dropdownAppliancesMenu);

// Close appliances dropdown
function dropdownAppliancesMenuClose(e) {
    e.preventDefault();
    appliancesDropdown.style.display = "none";
    appliancesMenu.style.display = "none";
    appliancesDropdownClose.style.display = "none";
    appliancesSelect.style.display = "block";
    ustensilsSelection.style.marginLeft = "15px";
    dropdownAppliancesMenuBoolean = false;
}
appliancesDropdownClose.addEventListener("click", dropdownAppliancesMenuClose)


// Open ustensils dropdown
let dropdownUstensilsMenuBoolean = false;
function dropdownUstensilsMenu(e) {
    e.preventDefault();
    if (!dropdownIngredientsMenuBoolean && !dropdownAppliancesMenuBoolean) {
        ustensilsDropdown.style.display = "block";
        ustensilsMenu.style.display = "flex";
        ustensilsDropdownClose.style.display = "block";
        ustensilsSelect.style.display = "none";
        dropdownUstensilsMenuBoolean = true;
    }
}
ustensilsSelect.addEventListener("click", dropdownUstensilsMenu);

// Close ustensils dropdown
function dropdownUstensilsMenuClose(e) {
    e.preventDefault();
    ustensilsDropdown.style.display = "none";
    ustensilsMenu.style.display = "none";
    ustensilsDropdownClose.style.display = "none";
    ustensilsSelect.style.display = "block";
    dropdownUstensilsMenuBoolean = false;
}
ustensilsDropdownClose.addEventListener("click", dropdownUstensilsMenuClose)

// Principal search
let principalSearchTab = [];
function principalSearch(recipes) {
    principalSearchTab = [];
    for (let recipe of recipes) {
        if (recipe.name.toLowerCase().lastIndexOf(searchBar.value.toLowerCase()) !== -1) {
            principalSearchTab.push(recipe);
        }
        else if (recipe.description.toLowerCase().lastIndexOf(searchBar.value.toLowerCase()) !== -1) {
            principalSearchTab.push(recipe);
        } else {
            for (let ingredient of recipe.ingredients) {
                if (ingredient.ingredient.toLowerCase().lastIndexOf(searchBar.value.toLowerCase()) !== -1) {
                    principalSearchTab.push(recipe);
                }
            }
        }
    }
    removeRecipes(principalSearchTab);
}

searchBar.addEventListener("input", () => {
    if (searchBar.value.length > 2 && searchFinalTab.length === 0) {
        principalSearch(recipes);
    }
    else if (searchBar.value.length > 2 && ingredients2.length === 0 && appliance2.length === 0 && ustensils2.length === 0) {
        principalSearch(recipes);
    }
    else if (searchBar.value.length > 2 && searchFinalTab.length > 0) {
        principalSearch(searchFinalTab);
    }
    if (searchBar.value.length === 0 && searchFinalTab.length > 0) {
        principalSearchTab = [];
        filterByTags(recipes, ingredients2, appliance2, ustensils2);
    }
    if (searchBar.value.length === 0 && ingredients2.length === 0 && appliance2.length === 0 && ustensils2.length === 0) {
        removeRecipes(recipes);
    }
})

// Final array of recipes
let searchFinalTab2 = [];
function finalRecipes(filteredRecipes, availableIngredients, availableUstensils, availableAppliances, ingredients, appliance, ustensils) {
    searchFinalTab = filteredRecipes;
    searchFinalTab2 = filteredRecipes;
    availableIngredients2 = availableIngredients;
    availableAppliances2 = availableAppliances;
    availableUstensils2 = availableUstensils;
    ingredients2 = ingredients;
    appliance2 = appliance;
    ustensils2 = ustensils;
    removeRecipes(filteredRecipes, availableIngredients, availableUstensils, availableAppliances);
}

// Ingredients search
function ingredientSearch() {
    ingredientSearchTab = [];
    uniqueIngredients.map(ingredient => {
        if (ingredient.toLowerCase().lastIndexOf(searchBar2.value.toLowerCase()) !== -1) {
            ingredientSearchTab.push(ingredient);
        }
    })
    ingredientsSecondarySearchDisplay(ingredientSearchTab, principalSearchTab, searchFinalTab2);
}
// Listener on ingredient field
const searchBar2 = document.querySelector("#searchbar2");
searchBar2.addEventListener("input", () => {
    if (searchBar2.value.length > 2 || searchBar2.value.length === 0) {
        ingredientSearch();
    }
})

// Appliances search
function applianceSearch() {
    applianceSearchTab = [];
    uniqueAppliances.map(appliance => {
        if (appliance.toLowerCase().lastIndexOf(searchBar3.value.toLowerCase()) !== -1) {
            applianceSearchTab.push(appliance);
        }
    })
    appliancesSecondarySearchDisplay(applianceSearchTab, principalSearchTab, searchFinalTab2);
}
// Listener on appliance field
const searchBar3 = document.querySelector("#searchbar3");
searchBar3.addEventListener("input", () => {
    if (searchBar3.value.length > 2 || searchBar3.value.length === 0) {
        applianceSearch();
    }
})

// Ustensils search
function ustensilSearch() {
    ustensilSearchTab = [];
    uniqueUstensils.map(ustensil => {
        if (ustensil.toLowerCase().lastIndexOf(searchBar4.value.toLowerCase()) !== -1) {
            ustensilSearchTab.push(ustensil);
        }
    })
    ustensilsSecondarySearchDisplay(ustensilSearchTab, principalSearchTab, searchFinalTab2);
}
// Listener on ustensil field
const searchBar4 = document.querySelector("#searchbar4");
searchBar4.addEventListener("input", () => {
    if (searchBar4.value.length > 2 || searchBar4.value.length === 0) {
        ustensilSearch();
    }
})

function filterByTags(filteredRecipes, ingredients, appliance, ustensils) {
    if (ingredients.length === 0 && appliance === "" && ustensils.length === 0 && principalSearchTab.length > 0) {
        filteredRecipes = principalSearchTab;
    }
    filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.ingredients
            .map(i => i.ingredient)
            .filter(ingredient => ingredients.indexOf(ingredient) >= 0).length === ingredients.length
        && recipe.ustensils
            .filter(ustensil => ustensils.toString().toLowerCase().indexOf(ustensil.toLowerCase()) >= 0).length === ustensils.length
        && (appliance === "" || recipe.appliance === appliance));
    const availableIngredients = filteredRecipes.reduce((acc, recipe) => {
        acc = acc.concat(recipe.ingredients.map(ingredient => ingredient.ingredient)
            .filter(ingredient => ingredients.indexOf(ingredient) === -1));
        return acc;
    }, []);
    const availableUstensils = filteredRecipes.reduce((acc, recipe) => {
        acc = acc.concat(recipe.ustensils.filter(ustensil => ustensils.indexOf(ustensil.toLowerCase()) === -1));
        return acc;
    }, []);
    const availableAppliances = filteredRecipes.reduce((acc, recipe) => {
        if (recipe.appliance !== appliance) {
            acc.push(recipe.appliance);
        }
        return acc;
    }, []);
    finalRecipes(filteredRecipes, availableIngredients, availableUstensils, availableAppliances, ingredients, appliance, ustensils);

}

function removeElements() {
    principalSearchTab = [];
    searchFinalTab = [];
    searchFinalTab2 = [];
}

export {
    removeElements, filterByTags
};