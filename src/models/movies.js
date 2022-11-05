export default class Movies {
  constructor(films) {
    this._films = films;
  }

  getMovies() {
    return this._films;
  }

  updateMovie(id, movie) {
    const index = this._films.findIndex((item) => item.id === movie.id);
    if (index === -1) {
      return;
    }
    this._films = [
      ...this._films.slice(0, index),
      movie,
      ...this._films.slice(index + 1),
    ];
  }
}
