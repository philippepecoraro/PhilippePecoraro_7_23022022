import { removeRecipes } from "../scripts/index.js"
import { recipes } from "../data/recipes.js";

const ingredientsSelect = document.querySelector(".ingredients-select");
const ingredientsDropdown = document.querySelector(".ingredients-dropdown");
const ingredientsMenu = document.querySelector(".ingredients-menu");
const dropdownClose = document.querySelector(".dropdown-close");
const appareilsSelection = document.querySelector(".appareils-selection");
const searchBarBar = document.querySelector(".search-bar-bar");
const searchBar = document.querySelector("#searchbar");
const searchIcon = document.querySelector(".search-icon");
const ingredientsSearchBar = document.querySelector(".ingredients-search-bar");

// Open dropdown
function dropdownMenu(e) {
    e.preventDefault();
    ingredientsDropdown.style.display = "block";
    ingredientsMenu.style.display = "flex";
    dropdownClose.style.display = "block";
    ingredientsSelect.style.display = "none";
    appareilsSelection.style.marginLeft = "520px";
}
ingredientsSelect.addEventListener("click", dropdownMenu);

// Close dropdown
function dropdownMenuClose(e) {
    e.preventDefault();
    ingredientsDropdown.style.display = "none";
    ingredientsMenu.style.display = "none";
    dropdownClose.style.display = "none";
    ingredientsSelect.style.display = "block";
    appareilsSelection.style.marginLeft = "15px";
}
dropdownClose.addEventListener("click", dropdownMenuClose)

// 
let principalSearchTab = [];
function principalSearch() {
    principalSearchTab = [];
    recipesData.map(recipe => {
        if (recipe.name.toLowerCase().lastIndexOf(searchBar.value.toLowerCase()) !== -1) {
            principalSearchTab.push(recipe.name, recipe.id);
        }
        else if (recipe.description.toLowerCase().lastIndexOf(searchBar.value.toLowerCase()) !== -1) {
            principalSearchTab.push(recipe.description, recipe.id);
        } else {
            recipe.ingredients.forEach(value => {
                if (value.ingredient.toLowerCase().lastIndexOf(searchBar.value.toLowerCase()) !== -1) {
                    principalSearchTab.push(value.ingredient, recipe.id);
                }
            })
        }
    })
    recipesAfterSort(principalSearchTab);
}

const recipesData = recipes;
let recipesAfterSortTab = [];
function recipesAfterSort(principalSearchTab) {
    recipesAfterSortTab = [];
    principalSearchTab.forEach(item => {
        if (!isNaN(item)) {
            recipesData.forEach(value => {
                if (value.id === item) {
                    recipesAfterSortTab.push(value)
                }
            })
        }
    })
    removeRecipes(recipesAfterSortTab);
}

searchBar.addEventListener("input", () => {
    if (searchBar.value.length > 2) {
        principalSearch()
    }
})

export { recipesAfterSortTab };