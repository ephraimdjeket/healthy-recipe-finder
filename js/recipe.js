import { renderError } from "./utils/error.js";
import { createRecipeCard } from "./utils/createRecipeCard.js";

const mainContent = document.getElementById("main");
const recipeContainer = document.getElementById("healthy-recipes-container");
const loader = document.getElementById("loader");
const url = "./js/data.json";

async function loadRecipes() {
  try {
    loader.classList.remove("hide");
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Something went wrong! Status code: ${res.status}`)
    const data = await res.json();
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