import {createElement} from "../utils";

export default class Navigation {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }
  getTemplate() {
    return `
      <nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
          <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${this._filters[`list`]}</span></a>
          <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${this._filters[`watched`]}</span></a>
          <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${this._filters[`favorites`]}</span></a>
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`;
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
