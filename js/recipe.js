const recipeContainer = document.getElementById("healthy-recipes-container");
const url = "./js/data.json";

async function loadRecipes() {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Something went wrong! Status code: ${res.status}`)
    const data = await res.json();
    console.log(data)

    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "recipe-card";
      console.log(card)
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
      const recipeButton = document.createElement("button");
      recipeButton.textContent = "View Recipe"
      recipeButton.className = "view-recipe-btn";


      recipeImg.append(sourceLarge, sourceSmall, fallbackImg);
      firstIconContainer.appendChild(firstIconImg);
      secondIconContainer.appendChild(secondIconImg);
      thirdIconContainer.appendChild(thirdIconImg);
      recipeIcons.append(firstIconContainer, secondIconContainer)
      card.append(recipeImg, recipeTitle, recipeDesc, recipeIcons, thirdIconContainer, recipeButton);
      recipeContainer.appendChild(card)
      console.log(card)
    })

  } catch (err) {

  }
}

loadRecipes();

//  <div class="recipe-card">
//         <picture>
//           <source srcset="assets/images/mediterranean-chickpea-salad-large.webp" media="(min-width: 48em)" />
//           <source srcset="assets/images/mediterranean-chickpea-salad-small.webp" media="(max-width: 47.99em)" />
//           <img src="assets/images/mediterranean-chickpea-salad-small.webp" alt="Mediterranean chickpea salad">
//         </picture>
//         <h2>Mediterranean Chickpea Salad</h2>
//         <p>A refreshing, protein-packed salad tossed in a lemon-olive oil dressing.</p>
//         <div class="recipe-card-icons">
//           <span><img src="assets/images/icon-servings.svg" alt="servings icon">Servings: 2</span>
//           <span><img src="assets/images/icon-prep-time.svg" alt="prep icon">Prep: 10 mins</span>
//           <div>
//             <span class="cook-icon"><img src="assets/images/icon-cook-time.svg" alt="cook icon"> Cook: 0 min</span>
//           </div>
//         </div>
//         <button class="view-recipe-btn">View Recipe</button>//       </div>