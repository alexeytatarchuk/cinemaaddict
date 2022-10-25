export const getFilterCounts = (films) => {
  return {
    'list': films.filter((film) => film.isInWatchlist).length,
    'watched': films.filter((film) => film.isWatched).length,
    'favorites': films.filter((film) => film.isFavorite).length
  };
};
