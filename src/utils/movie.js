const sortByRating = (movieA, movieB) => {
  if (movieA.rating > movieB.rating) {
    return -1;
  }
  if (movieA.rating < movieB.rating) {
    return 1;
  }
  return 0;
};

const sortByDate = (movieA, movieB) => {
  if (movieA.year > movieB.year) {
    return -1;
  }
  if (movieA.year < movieB.year) {
    return 1;
  }
  return 0;
};

const sortByComments = (movieA, movieB) => {
  if (movieA.comments.length > movieB.comments.length) {
    return -1;
  }
  if (movieA.comments.length < movieB.comments.length) {
    return 1;
  }
  return 0;
};

export {sortByDate, sortByRating, sortByComments};
