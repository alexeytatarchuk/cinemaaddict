import Observable from '../framework/observable.js';
import {FilterType} from '../const.js';

export default class FilterModel extends Observable {
  #filter = FilterType.ALL;
  #mode = true;

  get filter() {
    return this.#filter;
  }

  get mode() {
    return this.#mode;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };

  toggleMode = () => {
    this.#filter = 'STATS';
    this._notify('MODE', this.#filter);
  };
}
