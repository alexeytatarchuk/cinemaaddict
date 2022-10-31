import AbstractComponent from "../components/abstract";

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
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element.firstElementChild;
};

export const remove = (component) => {
  if (!(component instanceof AbstractComponent)) {
    throw new Error(`Can remove only components`);
  }
  component.getElement().remove();
  component.removeElement();
};
