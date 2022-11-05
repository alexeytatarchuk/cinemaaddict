import AbstractComponent from './abstract';

export default class ShowMore extends AbstractComponent {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return '<button class="films-list__show-more">Show more</button>';
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback();
  }

  setClickHandler(handler) {
    this._callback = handler;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}
