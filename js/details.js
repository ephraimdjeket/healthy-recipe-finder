import { renderError } from "./utils/error.js";

const mainContent = document.getElementById("main");
const recipeDetailContainer = document.getElementById("recipe-detail");
const recipeTypeText = document.getElementById("recipe-type");
const loader = document.getElementById("loader");

const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

const url = "/js/data.json";

async function loadData() {
  try {
    loader.classList.remove("hide");
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} Recipe not found`);
    loader.classList.add("hide");
    const recipeData = await res.json();
    const recipe = recipeData.find(item => item.id == recipeId);
    if (!recipe) {
      renderError(mainContent, "Recipe not found!");
    }
    renderRecipe(recipe);
  } catch (err) {
    loader.classList.add("hide");
    renderError(mainContent, err);
  } finally {
    loader.classList.add("hide");
  }
}

loadData();

function renderRecipe(recipe) {

  /* Recipe type text */
  recipeTypeText.textContent = `${recipe.title}`
  /* Picture container */
  const picture = document.createElement("picture");
  const sourceLarge = document.createElement("source");
  const sourceSmall = document.createElement("source");
  sourceLarge.srcset = recipe.image.large;
  sourceSmall.srcset = recipe.image.small;
  sourceLarge.media = "(min-width: 48em)";
  sourceSmall.media = "(max-width: 47.99em)";
  sourceSmall.srcset = recipe.image.small;
  const fallBackImg = document.createElement("img");
  fallBackImg.src = recipe.image.small;
  fallBackImg.alt = recipe.title;

  /* Recipe info container */
  const recipeInfoContainer = document.createElement("div");
  recipeInfoContainer.classList.add("recipe-detail-info");
  const recipeTitle = document.createElement("h2");
  recipeTitle.textContent = `${recipe.title}`;
  const recipeDescription = document.createElement("p");
  recipeDescription.textContent = `${recipe.overview}`;
  const recipeIconWrapper = document.createElement("div");
  recipeIconWrapper.classList.add("detail-icon-wrapper");

  /* Recipe icons */
  const firstIconContainer = document.createElement("span");
  const firstIcon = document.createElement("img");
  firstIcon.src = "../assets/images/icon-servings.svg";
  firstIcon.alt = "serving icon";
  firstIconContainer.append(firstIcon, `Servings: ${recipe.servings}`);
  const secondIconContainer = document.createElement("span");
  const secondIcon = document.createElement("img");
  secondIcon.src = "../assets/images/icon-prep-time.svg";
  secondIcon.alt = "prep icon";
  secondIconContainer.append(secondIcon, `Prep: ${recipe.prepMinutes}`);
  const thirdIconContainer = document.createElement("span");
  const thirdIcon = document.createElement("img");
  thirdIcon.src = "../assets/images/icon-cook-time.svg";
  thirdIcon.alt = "cook icon";
  thirdIconContainer.append(thirdIcon, `Cook: ${recipe.cookMinutes}`);

  /* Ingridients ul */

  const ingridientsTitle = document.createElement("h3");
  ingridientsTitle.textContent = "Ingridients:";
  const ingridientsListContainer = document.createElement("ul");
  ingridientsListContainer.classList.add("list-container");
  recipe.ingredients.forEach(ingridient => {
    const li = document.createElement("li");

    const bulletPoint = document.createElement("img");
    bulletPoint.src = "../assets/images/icon-bullet-point.svg";
    bulletPoint.alt = "bullet point svg";

    li.append(bulletPoint, ingridient);
    ingridientsListContainer.appendChild(li);
  });

  /* Instructions ul */

  const instructionsTitle = document.createElement("h3");
  instructionsTitle.textContent = "Instructions:";
  const instructionsListContainer = document.createElement("ul");
  instructionsListContainer.classList.add("list-container");
  recipe.instructions.forEach(instruction => {
    const li = document.createElement("li");

    const bulletPoint = document.createElement("img");
    bulletPoint.src = "../assets/images/icon-bullet-point.svg";
    bulletPoint.alt = "bullet point svg";

    li.append(bulletPoint, instruction);
    instructionsListContainer.appendChild(li);
  });



  picture.append(sourceLarge, sourceSmall, fallBackImg);
  recipeIconWrapper.append(firstIconContainer, secondIconContainer, thirdIconContainer);
  recipeInfoContainer.append(recipeTitle, recipeDescription, recipeIconWrapper, ingridientsTitle, ingridientsListContainer, instructionsTitle, instructionsListContainer);
  recipeDetailContainer.append(picture, recipeInfoContainer);
}