import {
    removeRecipes, uniqueIngredients, uniqueAppliances, uniqueUstensils,
    ingredientsSecondarySearchDisplay, appliancesSecondarySearchDisplay,
    ustensilsSecondarySearchDisplay, recipeInit, tagRemove
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
let sorted = [];
let recipesAfterSortTab = [];
let searchFinalTab = [];
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
    recipes.map(recipe => {
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

// listener on principal search bar
searchBar.addEventListener("input", () => {
    if (searchBar.value.length > 2 && searchFinalTab.length === 0) {
        principalSearch(recipes)
    } else if (searchBar.value.length > 2 && searchFinalTab.length > 0) {
        principalSearch(searchFinalTab)
    }
    if (searchBar.value.length === 0) {
        recipeInit();
        tagRemove();
        searchFinalTab = [];
    }
})
// Final array of recipes
let searchFinalTab2 = [];
function finalRecipes(searchTab, item, nb) {
    searchFinalTab = searchTab;
    searchFinalTab2 = searchTab;
    removeRecipes(searchTab, item, nb);
}
// Ingredients search
let ingredientSearchTab = [];
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
    if (searchBar2.value.length > 2) {
        ingredientSearch();
    }
    if (searchBar2.value.length === 0) {
        recipeInit();
        tagRemove();
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
    appliancesSecondarySearchDisplay(applianceSearchTab, principalSearchTab, searchFinalTab2);
}
// Listener on appliance field
const searchBar3 = document.querySelector("#searchbar3");
searchBar3.addEventListener("input", () => {
    if (searchBar3.value.length > 2) {
        applianceSearch();
    }
    if (searchBar3.value.length === 0) {
        recipeInit();
        tagRemove();
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
    ustensilsSecondarySearchDisplay(ustensilSearchTab, principalSearchTab, searchFinalTab2);
}
// Listener on ustensil field
const searchBar4 = document.querySelector("#searchbar4");
searchBar4.addEventListener("input", () => {
    if (searchBar4.value.length > 2) {
        ustensilSearch();
    }
    if (searchBar4.value.length === 0) {
        recipeInit();
        tagRemove();
    }
})

// Sort recipes by id
function recipeById(recipesData) {
    sorted.forEach(item => {
        if (!isNaN(item)) {
            recipesData.forEach(value => {
                if (value.id === item) {
                    recipesAfterSortTab.push(value)
                }
            })
        }
    })
}

// Sorting recipes elements
function sortingRecipeElements(recipesData, item, nb) {
    recipesAfterSortTab = [];
    sorted = [];
    if (nb === 1) {
        recipesData.map(recipe => {
            recipe.ingredients.forEach(value => {
                if (value.ingredient.toLowerCase().lastIndexOf(item.value.toLowerCase()) !== -1) {
                    sorted.push(value.ingredient, recipe.id)
                }
            })
        })
        recipeById(recipesData);
        finalRecipes(recipesAfterSortTab, item, 1);
    }
    if (nb === 2) {
        recipesData.map(recipe => {
            if (recipe.appliance.toLowerCase().lastIndexOf(item.value.toLowerCase()) !== -1) {
                sorted.push(recipe.appliance, recipe.id)
            }
        })
        recipeById(recipesData);
        finalRecipes(recipesAfterSortTab, item, 2);
    }
    if (nb === 3) {
        recipesData.map(recipe => {
            recipe.ustensils.forEach(value => {
                if (value.toLowerCase().lastIndexOf(item.value.toLowerCase()) !== -1) {
                    sorted.push(value, recipe.id);
                }
            })
        })
        recipeById(recipesData);
        finalRecipes(recipesAfterSortTab, item, 3);
    }
}
function removeElements() {
    principalSearchTab = [];
    searchFinalTab = [];
    searchFinalTab2 = [];

}

export { sortingRecipeElements, removeElements };