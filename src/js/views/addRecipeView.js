import View from "./View";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }
  /* Using the *this* keyword inside of a handler function points to the element on which the listener is attached To(_btnOpen), 
     That is why I exported to another method (toggleWindow)
     Then I called the method in the _addHandlerShowWindow method
     So it points to the current object not the (_btnOpen)
     */

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      // Converted the data Entries to an Object
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
