const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
const renderSpinner = function(parentEl) {
    const markup = `
  <div class="spinner">
  <svg>
  <use href="${icons}#icon-loader"></use>
  </svg>
  </div>
  `;
    parentEl.innerHTML = "";
    parentEl.insertAdjacentHTML("afterbegin", markup);
};
const showRecipe = async function() {
    try {
        const id = window.location.hash.slice(1);
        console.log(id);
        if (!id) return;
        // 1) loading recipe
        renderSpinner(recipeContainer);
        const res = await fetch(// "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886"
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        let { recipe } = data.data;
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };
        console.log(recipe);
    } catch (error) {
        alert(error);
    }
};
[
    "hashchange",
    "load"
].forEach((ev)=>window.addEventListener(ev, showRecipe));
window.addEventListener("hashchange", showRecipe);
window.addEventListener("load", showRecipe);

//# sourceMappingURL=index.62406edb.js.map
