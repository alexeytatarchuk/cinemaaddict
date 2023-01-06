/**
 * A class that implements the Observer pattern.
 */
export default class Observable {
  /** @type {Set<observerCallback>} A set of functions of the observerCallback type */
  #observers = new Set();

  /**
   * A method that allows you to subscribe to an event
   * @param {observerCallback} observer The function that will be called when the event occurs
   */
  addObserver(observer) {
    this.#observers.add(observer);
  }

  /**
   * A method that allows you to unsubscribe from an event
   * @param {observerCallback} observer A function that no longer needs to be called when an event occurs
   */
  removeObserver(observer) {
    this.#observers.delete(observer);
  }

  /**
   * A method for notifying subscribers about an event
   * @param {*} event Type of event
   * @param {*} payload Additional Information
   */
  _notify(event, payload) {
    this.#observers.forEach((observer) => observer(event, payload));
  }
}

/**
 * The function that will be called when the event occurs
 * @callback observerCallback
 * @param {*} event Type of event
 * @param {*} [payload] Additional Information
 */
