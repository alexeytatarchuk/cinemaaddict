import {createElement} from "../utils";

export default class FilmContainer {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return `
        <div class="films-list__container">
        </div>`;
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}

