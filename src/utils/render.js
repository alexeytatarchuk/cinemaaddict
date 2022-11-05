import AbstractComponent from '../views/abstract';

export const render = (container, child) => {
  if (container instanceof AbstractComponent) {
    container = container.getElement();
  }
  if (child instanceof AbstractComponent) {
    child = child.getElement();
  }
  container.append(child);
};

export const createElement = (template) => {
  const element = document.createElement('div');
  element.innerHTML = template;
  return element.firstElementChild;
};

export const remove = (component) => {
  if (!(component instanceof AbstractComponent)) {
    throw new Error('Can remove only components');
  }
  component.getElement().remove();
  component.removeElement();
};

export const updateElement = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);
  if (index === -1) {
    return items;
  }
  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const replace = (oldChild, newChild) => {
  if (!(oldChild instanceof AbstractComponent && newChild instanceof AbstractComponent)) {
    throw new Error('Can replace only components');
  }
  newChild = newChild.getElement();
  oldChild = oldChild.getElement();
  const parent = oldChild.parentElement;

  if (!(parent || oldChild || newChild)) {
    throw new Error('Can\'t replace non-existent elements');
  }

  parent.replaceChild(newChild, oldChild);
};
