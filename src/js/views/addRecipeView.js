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
  }
  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }
  /* Using the *this* keyword inside of a handler points to the element on which the listenner is attached To(_btnOpen), 
     That is why I exported to another method (toggleWindow)
     Then I called the method in the _addHandlerShowWindow method 
     So it points to the current object not the (_btnOpen) 
     */

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
