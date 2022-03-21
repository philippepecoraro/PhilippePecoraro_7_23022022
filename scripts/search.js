import {
    removeRecipes, uniqueIngredients, uniqueAppliances, uniqueUstensils,
    ingredientsSecondarySearchDisplay, appliancesSecondarySearchDisplay,
    ustensilsSecondarySearchDisplay
} from "../scripts/index.js"
import { recipes } from "../data/recipes.js";

const recipesData = recipes;
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
const searchBarBar = document.querySelector(".search-bar-bar");
const searchBar = document.querySelector("#searchbar");
let sortedIngredient = [];
let sortedAppliance = [];
let sortedUstensil = [];
let ingredientRecipesAfterSortTab = [];
let applianceRecipesAfterSortTab = [];
let ustensilRecipesAfterSortTab = [];
const searchIcon = document.querySelector(".search-icon");
const ingredientsSearchBar = document.querySelector(".ingredients-search-bar");
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
function principalSearch() {
    principalSearchTab = [];
    recipesData.map(recipe => {
        if (recipe.name.toLowerCase().lastIndexOf(searchBar.value.toLowerCase()) !== -1) {
            principalSearchTab.push(recipe);

        }
        else if (recipe.description.toLowerCase().lastIndexOf(searchBar.value.toLowerCase()) !== -1) {
            principalSearchTab.push(recipe);
        } else {
            recipe.ingredients.forEach(value => {
                if (value.ingredient.toLowerCase().lastIndexOf(searchBar.value.toLowerCase()) !== -1) {
                    principalSearchTab.push(recipe);
                }
            })
        }
    })
    removeRecipes(principalSearchTab);
}

searchBar.addEventListener("input", () => {
    if (searchBar.value.length > 2) {
        principalSearch()
    }
})

// Ingredients search
let ingredientSearchTab = [];
function ingredientSearch(principalSearchTab) {
    ingredientSearchTab = [];
    uniqueIngredients.map(ingredient => {
        if (ingredient.toLowerCase().lastIndexOf(searchBar2.value.toLowerCase()) !== -1) {
            ingredientSearchTab.push(ingredient);
        }
    })
    ingredientsSecondarySearchDisplay(ingredientSearchTab, principalSearchTab);
}
const searchBar2 = document.querySelector("#searchbar2");
searchBar2.addEventListener("input", () => {
    if (searchBar2.value.length > 2) {
        ingredientSearch(principalSearchTab);
    }
})

// Appliances search
let applianceSearchTab = [];
function applianceSearch() {
    applianceSearchTab = [];
    uniqueAppliances.map(appliance => {
        if (appliance.toLowerCase().lastIndexOf(searchBar3.value.toLowerCase()) !== -1) {
            applianceSearchTab.push(appliance);
        }
    })
    appliancesSecondarySearchDisplay(applianceSearchTab, principalSearchTab);
}
const searchBar3 = document.querySelector("#searchbar3");
searchBar3.addEventListener("input", () => {
    if (searchBar3.value.length > 2) {
        applianceSearch();
    }
})

// Ustensils search
let ustensilSearchTab = [];
function ustensilSearch() {
    ustensilSearchTab = [];
    uniqueUstensils.map(ustensil => {
        if (ustensil.toLowerCase().lastIndexOf(searchBar4.value.toLowerCase()) !== -1) {
            ustensilSearchTab.push(ustensil);
        }
    })
    ustensilsSecondarySearchDisplay(ustensilSearchTab, principalSearchTab);
}

const searchBar4 = document.querySelector("#searchbar4");
searchBar4.addEventListener("input", () => {
    if (searchBar4.value.length > 2) {
        ustensilSearch();
    }
})

// Sort for ingredients tag
function ingredientSortedArray(recipesData, item) {
    ingredientRecipesAfterSortTab = [];
    sortedIngredient = [];
    recipesData.map(recipe => {
        recipe.ingredients.forEach(value => {
            if (value.ingredient.toLowerCase().lastIndexOf(item.value.toLowerCase()) !== -1) {
                sortedIngredient.push(value.ingredient, recipe.id)
            }
        })
    })
    sortedIngredient.forEach(item => {
        if (!isNaN(item)) {
            recipesData.forEach(value => {
                if (value.id === item) {
                    ingredientRecipesAfterSortTab.push(value)
                }
            })
        }
    })
    removeRecipes(ingredientRecipesAfterSortTab, item, 1);
}

// Sort for appliances tag
function applianceSortedArray(recipesData, item) {
    applianceRecipesAfterSortTab = [];
    sortedAppliance = [];
    recipesData.map(recipe => {
        if (recipe.appliance.toLowerCase().lastIndexOf(item.value.toLowerCase()) !== -1) {
            sortedAppliance.push(recipe.appliance, recipe.id)
        }
    })
    sortedAppliance.forEach(item => {
        if (!isNaN(item)) {
            recipesData.forEach(value => {
                if (value.id === item) {
                    applianceRecipesAfterSortTab.push(value)
                }
            })
        }
    })
    removeRecipes(applianceRecipesAfterSortTab, item, 2);
}
// Sort for ustensils tag
function ustensilSortedArray(recipesData, item) {
    ustensilRecipesAfterSortTab = [];
    sortedUstensil = [];
    recipesData.map(recipe => {
        recipe.ustensils.forEach(value => {
            if (value.toLowerCase().lastIndexOf(item.value.toLowerCase()) !== -1) {
                sortedUstensil.push(value, recipe.id);
            }
        })
    })
    sortedUstensil.forEach(item => {
        if (!isNaN(item)) {
            recipesData.forEach(value => {
                if (value.id === item) {
                    ustensilRecipesAfterSortTab.push(value)
                }
            })
        }
    })
    removeRecipes(ustensilRecipesAfterSortTab, item, 3);
}

export {
    principalSearchTab, ingredientSearchTab,
    ingredientSortedArray, applianceSortedArray, ustensilSortedArray,
    ingredientRecipesAfterSortTab, applianceRecipesAfterSortTab,
    ustensilRecipesAfterSortTab
};