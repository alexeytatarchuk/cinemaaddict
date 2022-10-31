export const getRandomInt = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFromArray = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

export const getDateComment = (date) => {
  return date.toLocaleString(`en-ZA`);
};

export const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element.firstElementChild;
};

export const render = (container, element) => {
  container.append(element);
};
