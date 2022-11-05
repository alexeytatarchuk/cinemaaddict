export const getRandomInt = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomBoolean = () => Math.random() >= 0.5;

export const getRandomFromArray = (array) => array[getRandomInt(0, array.length - 1)];

export const getDateComment = (date) => date.toLocaleString();


