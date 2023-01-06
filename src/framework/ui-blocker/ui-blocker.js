import './ui-blocker.css';

/**
 * A class for locking the interface
 */
export default class UiBlocker {
  /** @type {number} Time to interface blocking in milliseconds */
  #lowerLimit;

  /** @type {number} Minimum interface blocking time in milliseconds */
  #upperLimit;

  /** @type {HTMLElement|null} The element blocking the interface */
  #element;

  /** @type {number} Call time of the block method */
  #startTime;

  /** @type {number} Call time of the unblock method */
  #endTime;

  /** @type {number} Timer ID */
  #timerId;

  /**
   * @param {number} lowerLimit Time before interface is blocked in milliseconds. If you call the unblock method earlier, the interface will not be locked
   * @param {number} upperLimit Minimum blocking time in milliseconds. Minimum locking time in milliseconds
   */
  constructor(lowerLimit, upperLimit) {
    this.#lowerLimit = lowerLimit;
    this.#upperLimit = upperLimit;

    this.#element = document.createElement('div');
    this.#element.classList.add('ui-blocker');
    document.body.append(this.#element);
  }

  /** Method for locking the interface */
  block = () => {
    this.#startTime = Date.now();
    this.#timerId = setTimeout(() => {
      this.#addClass();
    }, this.#lowerLimit);
  };

  /** Method to unlock the interface */
  unblock = () => {
    this.#endTime = Date.now();
    const duration = this.#endTime - this.#startTime;

    if (duration < this.#lowerLimit) {
      clearTimeout(this.#timerId);
      return;
    }

    if (duration >= this.#upperLimit) {
      this.#removeClass();
      return;
    }

    setTimeout(this.#removeClass, this.#upperLimit - duration);
  };

  /** A method that adds a CSS class to an element */
  #addClass = () => {
    this.#element.classList.add('ui-blocker--on');
  };

  /** A method that removes a CSS class from an element */
  #removeClass = () => {
    this.#element.classList.remove('ui-blocker--on');
  };
}
