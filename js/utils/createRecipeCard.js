export function createRecipeCard(item) {
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
  recipeImg.append(sourceLarge, sourceSmall, fallbackImg);

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
  firstIconContainer.appendChild(firstIconImg);

  const secondIconContainer = document.createElement("span");
  const secondIconImg = document.createElement("img");
  secondIconContainer.textContent = `Prep: ${item.prepMinutes} min`;
  secondIconImg.src = "../assets/images/icon-prep-time.svg";
  secondIconImg.alt = "prep icon";
  secondIconContainer.appendChild(secondIconImg);

  const thirdIconContainer = document.createElement("span");
  const thirdIconImg = document.createElement("img");
  thirdIconContainer.className = "cook-icon";
  thirdIconImg.src = "../assets/images/icon-cook-time.svg";
  thirdIconImg.alt = "cook time icon";
  thirdIconContainer.textContent = `Cook: ${item.cookMinutes} min`;
  thirdIconContainer.appendChild(thirdIconImg);

  recipeIcons.append(firstIconContainer, secondIconContainer, thirdIconContainer);

  const recipeButton = document.createElement("a");
  recipeButton.href = `details.html?id=${item.id}`;
  recipeButton.className = "view-recipe-btn";
  recipeButton.textContent = "View Recipe";

  card.append(recipeImg, recipeTitle, recipeDesc, recipeIcons, thirdIconContainer, recipeButton);

  return card;
}