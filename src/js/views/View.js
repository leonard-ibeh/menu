import icons from "url:../../img/icons.svg";
import recipeView from "./recipeView";

export default class View {
  _data;
  /**
   *  Render the received object to the DOM
   * @param {object| Object[]} data The data to be rendered (e.g recipe)
   * @param {Boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string } A markup string is returned if render=false
   * @this {object} view instance
   * @author Leonard Ibeh.
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;
    const newmarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newmarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      //   Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log("👋", newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }
      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  //  This clears data from the parent Element
  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
      <svg>
      <use href="${icons}#icon-loader"></use>
      </svg>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // This renders the Error messages
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
           <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
     </div> 
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      
     <div class="message">
         <div>
           <svg>
             <use href="${icons}#icon-smile"></use>
           </svg>
         </div>
        <p>${message}</p>
     </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
