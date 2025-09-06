import { renderError } from "./utils/error.js";

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
      const card = document.createElement("div");
      card.className = "recipe-card";
      const recipeImg = document.createElement("picture");
      const sourceLarge = document.createElement("source");
      sourceLarge.srcset = item.image.large;
      sourceLarge.media = "(min-width: 48em)";
      const sourceSmall = document.createElement("source");
      sourceSmall.srcset = item.image.small;
      sourceSmall.media = "(max-width: 47.99em)";
      const fallbackImg = document.createElement("img");
      fallbackImg.src = item.image.small;
      fallbackImg.alt = item.slug;
      const recipeTitle = document.createElement("h2");
      recipeTitle.textContent = item.title;
      const recipeDesc = document.createElement("p");
      recipeDesc.textContent = item.overview;
      const recipeIcons = document.createElement("div");
      recipeIcons.className = "recipe-card-icons";
      const firstIconContainer = document.createElement("span");
      const firstIconImg = document.createElement("img");
      firstIconContainer.textContent = `Servings: ${item.servings}`;
      firstIconImg.src = "../assets/images/icon-servings.svg";
      firstIconImg.alt = "servings icon";
      const secondIconContainer = document.createElement("span");
      const secondIconImg = document.createElement("img");
      secondIconContainer.textContent = `Prep: ${item.prepMinutes} min`;
      secondIconImg.src = "../assets/images/icon-prep-time.svg";
      secondIconImg.alt = "prep icon";
      const thirdIconContainer = document.createElement("span");
      const thirdIconImg = document.createElement("img");
      thirdIconContainer.className = "cook-icon";
      thirdIconImg.src = "../assets/images/icon-cook-time.svg";
      thirdIconImg.alt = "cook time icon";
      thirdIconContainer.textContent = `Cook: ${item.cookMinutes} min`;
      const recipeButton = document.createElement("a");
      recipeButton.href = `details.html?id=${item.id}`;
      recipeButton.className = "view-recipe-btn";
      recipeButton.textContent = "View Recipe";


      recipeImg.append(sourceLarge, sourceSmall, fallbackImg);
      firstIconContainer.appendChild(firstIconImg);
      secondIconContainer.appendChild(secondIconImg);
      thirdIconContainer.appendChild(thirdIconImg);
      recipeIcons.append(firstIconContainer, secondIconContainer)
      card.append(recipeImg, recipeTitle, recipeDesc, recipeIcons, thirdIconContainer, recipeButton);
      recipeContainer.appendChild(card)
    })

  } catch (err) {
    loader.classList.add("hide");
    renderError(mainContent, err)

  } finally {
    loader.classList.add("hide");
  }

}

loadRecipes();