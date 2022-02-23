import { recipes } from "../data/recipes.js";

const recipesData = recipes;
console.log('recipesData:', recipesData)

const cardDeck = document.querySelector(".card-deck");
const card1 = document.querySelector(".col-card");
let ingredientsTab = [];
let recipesIdTab = [];
let recipesNameTab = [];
let recipesDescriptionTab = [];

function recipesFactory(data) {
    const { id, name, servings, ingredients,
        time, description, appliance, ustensils } = data;

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

        formatIngredients(ingredients, div2, id);

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
let recipesIngredientsTab = [];
recipesData.forEach(recipe => {
    const displayData = document.querySelector(".display-data");
    recipesIdTab.push(recipe.id);
    recipesNameTab.push(recipe.name);
    recipesIngredientsTab.push(recipe.ingredients)
    recipesDescriptionTab.push(recipe.description);
    const recipeModel = recipesFactory(recipe);
    const cardDom = recipeModel.getRecipeCardDom();
    cardDeck.appendChild(cardDom);
})

function formatIngredients(ingredients, div2, id) {
    let dataId = -1;
    for (let ingredient of ingredients) {
        ingredientsTab.push(ingredient.ingredient);
        dataId++;

        if (ingredient.quantity === undefined) {
            ingredient.quantity = "";
        }
        if (ingredient.unit === undefined) {
            ingredient.unit = "";
        }
        if (ingredient.unit === "cuillères à soupe") {
            ingredient.unit = "cuillères";
        }
        if (ingredient.unit === "grammes") {
            ingredient.unit = "g";
        }
        const p = document.createElement('p');
        p.innerHTML = `${ingredient.ingredient}:<span>
        ${ingredient.quantity}${ingredient.unit}</span>`;
        div2.appendChild(p);

        const ingredientsMenu = document.querySelector(".ingredients-menu");
        const div = document.createElement("div");
        div.className = "ingredient-item";
        div.setAttribute("data-id", `${id}${dataId}`);
        div.innerHTML = ` ${ingredient.ingredient}`;
        ingredientsMenu.appendChild(div);
    }
}
export { recipesIdTab, recipesNameTab, ingredientsTab, recipesDescriptionTab };



