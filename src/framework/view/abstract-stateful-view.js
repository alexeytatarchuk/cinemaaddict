import AbstractView from './abstract-view.js';

/**
 * Abstract view class with state
 */
export default class AbstractStatefulView extends AbstractView {
  /** @type {Object} State object  */
  _state = {};

  /**
   * Method for updating the state and redrawing an element
   * @param {Object} update The object with the updated part of the state
   */
  updateElement = (update) => {
    if (!update) {
      return;
    }

    this._setState(update);

    this.#rerenderElement();
  };

  /**
   * Method for restoring handlers after redrawing an element
   * @abstract
   */
  _restoreHandlers = () => {
    throw new Error('Abstract method not implemented: restoreHandlers');
  };

  /**
   * Method for status updates
   * @param {Object} update The object with the updated part of the state
   */
  _setState = (update) => {
    this._state = {...this._state, ...update};
  };

  /** Method for redrawing an element */
  #rerenderElement = () => {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);

    this._restoreHandlers();
  };

  get template() {
    return '';
  }
}
