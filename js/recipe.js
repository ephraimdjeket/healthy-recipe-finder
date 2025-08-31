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
      firstIconContainer = document.createElement("span");
      firstIconContainer.textContent = `Servings: ${item.servings}`;
      firstIconImg = document.createElement("img");
      firstIconImg.src = "../assets/images/icon-servings.svg";
      firstIconImg.alt = "servings icon";
      secondIconImg = document.createElement("img");
      secondIconContainer = document.createElement("span");
      secondIconContainer.textContent = `Prep: ${item.prepMinutes} min`;
      secondIconImg.src = "../assets/images/icon-prep-time.svg";
      secondIconImg.alt = "prep icon";
      thirdIconContainer = document.createElement("span");
      thirdIconContainer.className = "cook-icon";
      thirdIconImg = document.createElement("img");
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

  } finally {
    loader.classList.add("hide");
  }

}

loadRecipes();