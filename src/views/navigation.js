import AbstractComponent from './abstract';

export default class Navigation extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return `<nav class="main-navigation">
              <div class="main-navigation__items">
                <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
                <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${this._filters['list']}</span></a>
                <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${this._filters['watched']}</span></a>
                <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${this._filters['favorites']}</span></a>
              </div>
              <a href="#stats" class="main-navigation__additional">Stats</a>
            </nav>`;
  }
}
