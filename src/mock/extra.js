export const generateTopRated = (films) => {
  return films.map((x) => x)
    .sort(function (a, b) {
      if (a.rating > b.rating) {
        return -1;
      }
      if (a.rating < b.rating) {
        return 1;
      }
      return 0;
    });
};

export const generateTopCommented = (films) => {
  return films.map((x) => x)
    .sort(function (a, b) {
      if (a.comments > b.comments) {
        return -1;
      }
      if (a.comments < b.comments) {
        return 1;
      }
      return 0;
    });
};
