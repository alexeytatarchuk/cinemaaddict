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
  if (movieA.releaseDate > movieB.releaseDate) {
    return -1;
  }
  if (movieA.releaseDate < movieB.releaseDate) {
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

const getDuration = (runtime) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
};


export {sortByDate, sortByRating, sortByComments, getDuration};
