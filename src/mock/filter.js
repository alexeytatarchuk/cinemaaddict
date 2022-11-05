export const getFilterCounts = (films) => ({
  'list': films.filter((film) => film.isInWatchList).length,
  'watched': films.filter((film) => film.isWatched).length,
  'favorites': films.filter((film) => film.isFavorite).length
});
