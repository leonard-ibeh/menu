import { async } from "regenerator-runtime";

export const getJSON = async function (url) {
  try {
    const res = await fetch(
      // "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886"
      url
      // "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcb6e"
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    alert(err);
  }
};
