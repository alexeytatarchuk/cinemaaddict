import AbstractComponent from './abstract';

export default class AbstractSmartComponent extends AbstractComponent {

  constructor() {
    super();
    this.updateData = this.updateData.bind(this);
  }

  recoveryListeners() {
    throw new Error('Abstract method not implemented: recoveryListeners');
  }

  updateData(update) {
    if (!update) {
      return;
    }
    this._data = Object.assign(
      {},
      this._data,
      update,
    );
    this.rerender();
  }


  rerender() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    this.recoveryListeners();
  }
}
