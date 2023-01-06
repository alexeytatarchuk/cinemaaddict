import {createElement} from '../render.js';
import './abstract-view.css';

/** @const {string} A class that implements the "head shake" effect */
const SHAKE_CLASS_NAME = 'shake';

/** @const {number} Animation time in milliseconds */
const SHAKE_ANIMATION_TIMEOUT = 600;

/**
 * Abstract view class
 */
export default class AbstractView {
  /** @type {HTMLElement|null} Submission element */
  #element = null;

  /** @type {Object} An object with callbacks. Can be used to store event handlers */
  _callback = {};

  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }

  /**
   * Getter for obtaining an element
   * @returns {HTMLElement} View element
   */
  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  /**
   * Getter for element markup
   * @abstract
   * @returns {string} Markup an element as a string
   */
  get template() {
    throw new Error('Abstract method not implemented: get template');
  }

  /** Method for removing an element */
  removeElement() {
    this.#element = null;
  }

  show() {
    this.element.classList.remove('visually-hidden');
  }

  hide() {
    this.element.classList.add('visually-hidden');
  }

  /**
   * A method that realizes the "head shake" effect
   * @param {shakeCallback} [callback] The function that will be called after the end of the animation
   */
  shake(callback) {
    this.element.classList.add(SHAKE_CLASS_NAME);
    setTimeout(() => {
      this.element.classList.remove(SHAKE_CLASS_NAME);
      callback?.();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}

/**
 * The function that will be called by the shake method after the animation ends
 * @callback shakeCallback
 */
