import {createElement} from "../utils";

export default class ShowMore {
  constructor(count) {
    this._element = null;
    this._count = count;
  }
  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
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
