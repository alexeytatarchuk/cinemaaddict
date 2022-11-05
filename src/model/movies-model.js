import {generateFilm} from '../mock/film';

export default class MoviesModel {
  #movies = Array.from({length: 22}, generateFilm);

  get movies() {
    return this.#movies;
  }

  updateMovie(id, movie) {
    const index = this.#movies.findIndex((item) => item.id === movie.id);
    if (index === -1) {
      return;
    }
    this.#movies = [
      ...this.#movies.slice(0, index),
      movie,
      ...this.#movies.slice(index + 1),
    ];
  }
}
