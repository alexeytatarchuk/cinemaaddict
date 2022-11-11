import AbstractView from '../framework/view/abstract-view';

export default class SortingView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    const returnActiveSort = (item) => item === this.#currentSortType ? 'sort__button--active' : '';
    return `
      <ul class="sort">
        <li><a href="#" data-sort-type="default" class="sort__button ${returnActiveSort('default')}">Sort by default</a></li>
        <li><a href="#" data-sort-type="date" class="sort__button ${returnActiveSort('date')}">Sort by date</a></li>
        <li><a href="#" data-sort-type="rating" class="sort__button ${returnActiveSort('rating')}">Sort by rating</a></li>
      </ul>`;
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.querySelectorAll('.sort__button').forEach((button) => {
      button.addEventListener('click', this.#sortTypeChangeHandler);
    });
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.classList.contains('sort__button--active')) {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
