import { renderError } from "./utils/error.js";
import { createRecipeCard } from "./utils/createRecipeCard.js";
import { handleSearch } from "./utils/searchFunction.js";

const maxPrepTime = document.getElementById("max-prep-time");
const maxCookTime = document.getElementById("max-cook-time");
const searchInput = document.getElementById("search-recipes");
const mainContent = document.getElementById("main");
export const recipeContainer = document.getElementById("healthy-recipes-container");
const loader = document.getElementById("loader");
const url = "./js/data.json";

export let data = [];

async function loadRecipes() {
  try {
    loader.classList.remove("hide");
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Something went wrong! Status code: ${res.status}`)
    data = await res.json();
    loader.classList.add("hide");


    data.forEach(item => {
      const card = createRecipeCard(item);
      recipeContainer.appendChild(card);
    })

  } catch (err) {
    loader.classList.add("hide");
    renderError(mainContent, err)

  } finally {
    loader.classList.add("hide");
  }

}

loadRecipes();

searchInput.addEventListener("input", handleSearch);


maxPrepTime.addEventListener("change", () => {

  const maxTime = parseInt(maxPrepTime.value);

  const matches = !maxTime ? data : data.filter(item => item.prepMinutes <= maxTime);


  recipeContainer.innerHTML = "";

  matches.forEach(recipe => {
    recipeContainer.appendChild(createRecipeCard(recipe));
  });
});

maxCookTime.addEventListener("change", () => {

  const maxTime = parseInt(maxCookTime.value);

  const matches = !maxTime ? data : data.filter(item => item.cookMinutes <= maxTime);


  recipeContainer.innerHTML = "";

  matches.forEach(recipe => {
    recipeContainer.appendChild(createRecipeCard(recipe));
  });
});

