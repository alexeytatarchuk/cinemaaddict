import AbstractComponent from "./abstract";

export default class Sorting extends AbstractComponent {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
    this._sortType = `default`;
  }

  getTemplate() {
    return `
      <ul class="sort">
        <li><a href="#" data-sort-type="default" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" data-sort-type="date" class="sort__button">Sort by date</a></li>
        <li><a href="#" data-sort-type="rating" class="sort__button">Sort by rating</a></li>
      </ul>`;
  }

  _clickHandler(evt) {
    evt.preventDefault();
    if (!evt.target.classList.contains(`sort__button--active`)) {
      this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
      evt.target.classList.add(`sort__button--active`);
      this._sortType = evt.target.getAttribute(`data-sort-type`);
      this._callback(this._sortType);
    }
  }

  changeSortTypeHandler(handler) {
    this._callback = handler;
    this.getElement().querySelectorAll(`.sort__button`).forEach((button)=>{
      button.addEventListener(`click`, this._clickHandler);
    });
  }
}
