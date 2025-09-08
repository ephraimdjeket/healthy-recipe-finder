import { data, recipeContainer } from "../recipe.js";
import { createRecipeCard } from "./createRecipeCard.js";

export function handleSearch(e) {
  const query = e.target.value.toLowerCase();

  const matches = data.filter(item =>
    item.title.toLowerCase().includes(query)
  );

  recipeContainer.innerHTML = "";

  matches.forEach(recipe => {
    recipeContainer.appendChild(createRecipeCard(recipe));
  });

}