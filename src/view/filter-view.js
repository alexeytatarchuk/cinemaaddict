import AbstractView from '../framework/view/abstract-view';

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #mode = false;

  constructor(filters, currentFilterType, mode) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#mode = mode;
  }

  get template() {
    let result = '<nav class="main-navigation"><div class="main-navigation__items">';
    this.#filters.forEach((filter) => {
      let classActive = '';
      if (filter.type === this.#currentFilter) {
        classActive = ' main-navigation__item--active';
      }
      result += `<a href="#${filter.type}" data-filter-type="${filter.type}" class="main-navigation__item${classActive}">
                    ${filter.name} `;
      if (filter.type !== 'all') {
        result += `<span class="main-navigation__item-count">${filter.count}</span>`;
      }
      result += '</a>';
    });
    if (this.#currentFilter !== 'STATS') {
      result += '</div><a href="#stats" class="main-navigation__additional">Stats</a></nav>';
    } else {
      result += '</div><a href="#stats" class="main-navigation__additional main-navigation__item--active">Stats</a></nav>';
    }
    return result;
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.querySelectorAll('.main-navigation__item')
      .forEach((item) => {
        item.addEventListener('click', this.#filterTypeChangeHandler);
      });
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  };

  #handleModeChange = (evt) => {
    evt.preventDefault();
    this._callback.modeChange();
  };

  setModeChangeHandler = (callback) => {
    this._callback.modeChange = callback;
    this.element.querySelector('.main-navigation__additional').addEventListener('click', this.#handleModeChange);
  };
}
