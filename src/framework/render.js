import AbstractView from './view/abstract-view.js';

/** @enum {string} List of possible positions for rendering */
const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

/**
 * Function for creating an element based on markup
 * @param {string} template Markup in the form of a string
 * @returns {HTMLElement} Created element
 */
const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

/**
 * Function for rendering an element
 * @param {AbstractView} component The component that should have been rendered
 * @param {HTMLElement} container Element in which the component will be rendered
 * @param {string} place The position of the component relative to the container. By default - `beforeend`
 */
const render = (component, container, place = RenderPosition.BEFOREEND) => {
  if (!(component instanceof AbstractView)) {
    throw new Error('Can render only components');
  }

  if (container === null) {
    throw new Error('Container element doesn\'t exist');
  }

  container.insertAdjacentElement(place, component.element);
};

/**
 * Function for replacing one component by another
 * @param {AbstractView} newComponent Component to be shown
 * @param {AbstractView} oldComponent Component to hide
 */
const replace = (newComponent, oldComponent) => {
  if (!(newComponent instanceof AbstractView && oldComponent instanceof AbstractView)) {
    throw new Error('Can replace only components');
  }

  const newElement = newComponent.element;
  const oldElement = oldComponent.element;

  const parent = oldElement.parentElement;

  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }

  parent.replaceChild(newElement, oldElement);
};

/**
 * Function for removing a component
 * @param {AbstractView} component Component to be removed
 */
const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.element.remove();
  component.removeElement();
};

export {RenderPosition, createElement, render, replace, remove};
