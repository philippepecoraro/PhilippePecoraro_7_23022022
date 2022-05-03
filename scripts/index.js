import { recipes } from "../data/recipes.js";
import {
    removeElements, filterByTags
} from "../scripts/search.js";

const recipesData = recipes;
const cardDeck = document.querySelector(".card-deck");
let ingredientsTab = [];
let uniqueIngredients = [];
let appliancesTab = [];
let appliancesTab2 = [];
let availableAppliancesTab2 = [];
let availableUstensilsTab2 = [];
let uniqueAppliances = [];
let ustensilsTab = [];
let ustensilsTab2 = [];
let uniqueUstensils = [];
let ingredientsTagItem = [];
let appliancesTagItem = "";
let ustensilsTagItem = [];
const searchBar = document.querySelector("#searchbar");
const searchBar2 = document.querySelector("#searchbar2");
const searchBar3 = document.querySelector("#searchbar3");
const searchBar4 = document.querySelector("#searchbar4");
const tagsDisplay = document.querySelector(".tags-display");


// Recipes construct
function recipesFactory(data) {
    const { name, ingredients,
        time, description, appliance, ustensils } = data;
    appliancesTab.push(appliance);
    ustensilsTab.push(ustensils);

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
        formatDescription(description, div3);

        document.querySelector(".ingredients-selection").style.display = "block";
        document.querySelector(".appliances-selection").style.display = "block";
        document.querySelector(".ustensils-selection").style.display = "block";

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
ingredientsPrincipalSearchDisplay(recipesData);
appliancesPrincipalSearchDisplay(recipesData);
ustensilsPrincipalSearchDisplay(recipesData);

// Remove recipes data and call recipes display functions
function removeRecipes(filteredRecipes, availableIngredients, availableUstensils, availableAppliances) {
    const card1 = document.querySelectorAll(".col-card");
    card1.forEach(item => {
        item.remove();
    })
    ingredientRemove();
    applianceRemove();
    ustensilRemove();
    ingredientsTab = [];
    appliancesTab = [];
    ustensilsTab = [];
    appliancesTab2 = [];
    availableAppliancesTab2 = [];
    availableUstensilsTab2 = [];
    ustensilsTab2 = [];
    if (filteredRecipes.length > 0) {
        notEmptyRecipe();
        recipesDisplay(filteredRecipes);
        ingredientsPrincipalSearchDisplay(filteredRecipes, availableIngredients)
        appliancesPrincipalSearchDisplay(filteredRecipes, availableAppliances);
        ustensilsPrincipalSearchDisplay(filteredRecipes, availableUstensils);
    } else {
        emptyRecipeDisplay();
    }
}

// When no recipes to display
function emptyRecipeDisplay() {
    document.querySelector(".empty-recipe").style.display = "block";
    document.querySelector(".empty-recipe").innerHTML = `<p>Aucune recette ne correspond à votre critère...
     Vous pouvez chercher &laquo; tarte aux pommes &raquo;, &laquo; poisson &raquo;, etc.</p >`;
    document.querySelector(".ingredients-selection").style.display = "none";
    document.querySelector(".appliances-selection").style.display = "none";
    document.querySelector(".ustensils-selection").style.display = "none";
}

// When recipes not empty
function notEmptyRecipe() {
    document.querySelector(".empty-recipe").style.display = "none";
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
        if (ingredient.quantity === undefined) {
            ingredient.quantity = "";
        }
        if (ingredient.quantite) {
            ingredient.quantity = ingredient.quantite
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
        if (ingredient.ingredient === "Lait de Coco") {
            ingredient.ingredient = "Lait de coco";
        }
        if (ingredient.ingredient === "Crème Fraiche") {
            ingredient.ingredient = "Crème fraiche";
        }
        if (ingredient.ingredient === "Crème Fraîche") {
            ingredient.ingredient = "Crème fraîche";
        }
        if (ingredient.ingredient === "Sucre en Poudre") {
            ingredient.ingredient = "Sucre en poudre";
        }
        if (ingredient.ingredient === "Coulis de tomates") {
            ingredient.ingredient = "Coulis de tomate";
        }
        if (ingredient.ingredient === "huile d'olive" || ingredient.ingredient === "huile d'olives"
            || ingredient.ingredient === "Huile d'olives") {
            ingredient.ingredient = "Huile d'olive";
        }
        if (ingredient.ingredient === "Pommes") {
            ingredient.ingredient = "Pomme";
        }
        if (ingredient.ingredient === "farine") {
            ingredient.ingredient = "Farine";
        }
        if (ingredient.ingredient === "Bananes") {
            ingredient.ingredient = "Banane";
        }
        if (ingredient.ingredient === "Kiwis") {
            ingredient.ingredient = "Kiwi";
        }
        ingredientsTab.push(ingredient.ingredient);
        const p = document.createElement('p');
        p.innerHTML = `${ingredient.ingredient}:<span>
        ${ingredient.quantity}${ingredient.unit}</span>`;
        div2.appendChild(p);
    }
}
// formating description in recipes
function formatDescription(description, div3) {
    const p1 = document.createElement('p');
    if (description.length > 350) {
        description = description.substring(0, 182);
        p1.innerHTML = `${description} ...`;
    } else if (description.length > 260) {
        description = description.substring(0, 210);
        p1.innerHTML = `${description} ...`;
    } else {
        p1.innerHTML = `${description}`;
    }
    div3.appendChild(p1);
}

// Remove duplicate ingredients
function ingredientsPrincipalSearchDisplay(filteredRecipes, availableIngredients) {
    if (availableIngredients === undefined) {
        uniqueIngredients = [...new Set(ingredientsTab)]
        for (let ingredientsTagItemValue of ingredientsTagItem) {
            const myIndex = uniqueIngredients.indexOf(ingredientsTagItemValue);
            uniqueIngredients.splice(myIndex, 1);
        }
    } else {
        uniqueIngredients = [...new Set(availableIngredients)]
    }
    ingredientsDisplay(uniqueIngredients, filteredRecipes);
}

// Remove ingredients after secondary Search
function ingredientsSecondarySearchDisplay(ingredientSearchTab, principalSearchTab, tab) {
    ingredientRemove();
    if (tab.length > 0) {
        ingredientsDisplay(ingredientSearchTab, tab);
    }
    else if (recipes.length > 0) {
        ingredientsDisplay(ingredientSearchTab, principalSearchTab);
    } else {
        ingredientsDisplay(ingredientSearchTab, recipesData);
    }
}

function noTagDisplayRow() {
    if (ingredientsTagItem.length === 0 && appliancesTagItem === "" && ustensilsTagItem.length === 0) {
        document.querySelector(".tags-display").style.display = "none";
    }
}

function chooseRecipesForFilter(filteredRecipes, ingredientsTagItem, appliancesTagItem, ustensilsTagItem) {
    if (searchBar.value.length > 2) {
        filterByTags(filteredRecipes, ingredientsTagItem, appliancesTagItem, ustensilsTagItem);
    } else {
        filterByTags(recipes, ingredientsTagItem, appliancesTagItem, ustensilsTagItem);
    }
}


// Ingredients display
function ingredientsDisplay(sortedIngredients, filteredRecipes) {
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
            ingredientsTagItem.push(item.value);
            chooseRecipesForFilter(filteredRecipes, ingredientsTagItem, appliancesTagItem, ustensilsTagItem);
            ingredientTagDisplay(item, filteredRecipes);
        })
    })
}

// ingredient tag display
function ingredientTagDisplay(item, filteredRecipes) {
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
    searchBar2.value = "";
    document.querySelector(".tags-display").style.display = "flex";
    div2.querySelector(".ingredient-tag-close").addEventListener("click", function (e) {
        e.preventDefault();
        const closeTagParent = (e.currentTarget.parentNode).parentNode;
        closeTagParent.remove();
        const myIndex = ingredientsTagItem.indexOf(`${item.value}`);
        ingredientsTagItem.splice(myIndex, 1);
        chooseRecipesForFilter(filteredRecipes, ingredientsTagItem, appliancesTagItem, ustensilsTagItem);
        noTagDisplayRow();
    })
}

// Remove duplicate appliances
function appliancesPrincipalSearchDisplay(filteredRecipes, availableAppliances) {
    if (availableAppliances === undefined) {
        for (let appliancesValue of appliancesTab) {
            if (appliancesValue === "Casserolle.") {
                appliancesValue = "Casserolle";
            }
            appliancesTab2.push(appliancesValue);
        }
        uniqueAppliances = [...new Set(appliancesTab2)];
        for (let appliancesTagValue of appliancesTagItem) {
            const myIndex = uniqueAppliances.indexOf(appliancesTagValue);
            uniqueAppliances.splice(myIndex, 1);
        }
    } else {
        for (let availableAppliancesValue of availableAppliances) {
            if (availableAppliancesValue === "Casserolle.") {
                availableAppliancesValue = "Casserolle";
            }
            availableAppliancesTab2.push(availableAppliancesValue);
        }
        uniqueAppliances = [...new Set(availableAppliancesTab2)];
    }
    appliancesDisplay(uniqueAppliances, filteredRecipes);
}

// Remove appliances after secondary Search
function appliancesSecondarySearchDisplay(applianceSearchTab, principalSearchTab, tab) {
    applianceRemove();
    if (tab.length > 0) {
        appliancesDisplay(applianceSearchTab, tab);
    }
    else if (recipes.length > 0) {
        appliancesDisplay(applianceSearchTab, principalSearchTab);
    } else {
        appliancesDisplay(applianceSearchTab, recipesData);
    }
}

// Appliances display
function appliancesDisplay(sortedAppliances, filteredRecipes) {
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
            appliancesTagItem = item.value;
            chooseRecipesForFilter(filteredRecipes, ingredientsTagItem, appliancesTagItem, ustensilsTagItem);
            applianceTagDisplay(item, filteredRecipes);
        })
    })
}

// Appliance tag display
function applianceTagDisplay(item, filteredRecipes) {
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
    searchBar3.value = "";
    document.querySelector(".tags-display").style.display = "flex";
    div2.querySelector(".appliance-close-tag").addEventListener("click", function (e) {
        const closeTagParent = (e.currentTarget.parentNode).parentNode;
        closeTagParent.remove();
        appliancesTagItem = "";
        chooseRecipesForFilter(filteredRecipes, ingredientsTagItem, appliancesTagItem, ustensilsTagItem);
        noTagDisplayRow();
    })
}

// Remove duplicate ustensils
function ustensilsPrincipalSearchDisplay(filteredRecipes, availableUstensils) {
    for (let ustensilsValue of ustensilsTab) {
        for (let ustensilValue of ustensilsValue) {
            if (ustensilValue === "Cuillère à Soupe" || ustensilValue === "cuillère à Soupe") {
                ustensilValue = "cuillère à soupe";
            }
            if (ustensilValue === "Couteau") {
                ustensilValue = "couteau";
            }
            if (ustensilValue === "Cuillère en bois") {
                ustensilValue = "cuillère en bois";
            }
            if (ustensilValue === "Économe") {
                ustensilValue = "économe";
            } if (ustensilValue === "Poelle à frire") {
                ustensilValue = "poelle à frire";
            }
            ustensilsTab2.push(ustensilValue);
        }
    }
    if (availableUstensils === undefined) {
        uniqueUstensils = [...new Set(ustensilsTab2)];
        for (let ustensilsTagItemValue of ustensilsTagItem) {
            const myIndex = uniqueUstensils.indexOf(ustensilsTagItemValue);
            uniqueUstensils.splice(myIndex, 1);
        }

    } else {
        for (let availableUstensilValue of availableUstensils) {
            if (availableUstensilValue === "Cuillère à Soupe" || availableUstensilValue === "cuillère à Soupe") {
                availableUstensilValue = "cuillère à soupe";
            }
            if (availableUstensilValue === "Couteau") {
                availableUstensilValue = "couteau";
            }
            if (availableUstensilValue === "Cuillère en bois") {
                availableUstensilValue = "cuillère en bois";
            }
            if (availableUstensilValue === "Économe") {
                availableUstensilValue = "économe";
            } if (availableUstensilValue === "Poelle à frire") {
                availableUstensilValue = "poelle à frire";
            }
            availableUstensilsTab2.push(availableUstensilValue);
        }
        uniqueUstensils = [...new Set(availableUstensilsTab2)];
    }
    ustensilsDisplay(uniqueUstensils, filteredRecipes);
}

// Remove ustensils after secondary Search
function ustensilsSecondarySearchDisplay(ustensilSearchTab, principalSearchTab, tab) {
    ustensilRemove();
    if (tab.length > 0) {
        ustensilsDisplay(ustensilSearchTab, tab);
    }
    else if (recipes.length > 0) {
        ustensilsDisplay(ustensilSearchTab, principalSearchTab);
    } else {
        ustensilsDisplay(ustensilSearchTab, recipesData);
    }
}

// Ustensils display
function ustensilsDisplay(sortedUstensils, filteredRecipes) {
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
            ustensilsTagItem.push(item.value);
            chooseRecipesForFilter(filteredRecipes, ingredientsTagItem, appliancesTagItem, ustensilsTagItem);
            ustensilTagDisplay(item, filteredRecipes);
        })
    })
}

// Ustensils tag display
function ustensilTagDisplay(item, filteredRecipes) {
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
    searchBar4.value = "";
    document.querySelector(".tags-display").style.display = "flex";
    div2.querySelector(".ustensil-tag-close").addEventListener("click", function (e) {
        e.preventDefault();
        const closeTagParent = (e.currentTarget.parentNode).parentNode;
        closeTagParent.remove();
        const myIndex = ustensilsTagItem.indexOf(`${item.value}`);
        ustensilsTagItem.splice(myIndex, 1);
        chooseRecipesForFilter(filteredRecipes, ingredientsTagItem, appliancesTagItem, ustensilsTagItem);
        noTagDisplayRow();

    })
}
function ingredientRemove() {
    const ingredientItem = document.querySelectorAll(".ingredient-item");
    ingredientItem.forEach(item => {
        item.remove();
    })
}
function applianceRemove() {
    const applianceItem = document.querySelectorAll(".appliance-item");
    applianceItem.forEach(item => {
        item.remove();
    })
}
function ustensilRemove() {
    const ustensilItem = document.querySelectorAll(".ustensil-item");
    ustensilItem.forEach(item => {
        item.remove();
    })
}

// Close tags and initialize the fields
function recipeInit() {
    searchBar.value = "";
    searchBar2.value = "";
    searchBar3.value = "";
    searchBar4.value = "";
    ingredientsTagItem = [];
    appliancesTagItem = "";
    ustensilsTagItem = [];
    removeRecipes(recipes);
    removeElements();
}

// Close all tags
function tagRemove() {
    document.querySelectorAll(".ingredient-tag").forEach(item => {
        item.remove();
    });
    document.querySelectorAll(".appliance-tag").forEach(item => {
        item.remove();
    })
    document.querySelectorAll(".ustensil-tag").forEach(item => {
        item.remove();
    })
    document.querySelector(".tags-display").style.display = "none";
}

export {
    removeRecipes, uniqueIngredients, uniqueAppliances,
    ingredientsSecondarySearchDisplay, appliancesSecondarySearchDisplay,
    uniqueUstensils, ustensilsSecondarySearchDisplay, recipeInit, tagRemove
    , ingredientsTagItem
};



