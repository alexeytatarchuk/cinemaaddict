import AbstractView from '../framework/view/abstract-view';

export default class LoadMoreButtonView extends AbstractView {
  get template() {
    return '<button class="films-list__show-more">Show more</button>';
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
