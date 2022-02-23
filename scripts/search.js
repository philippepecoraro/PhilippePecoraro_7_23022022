import { recipesIdTab, recipesNameTab, ingredientsTab, recipesDescriptionTab } from "../scripts/index.js"

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


