import Observable from '../framework/observable';
import {generateFilm} from '../mock/film';

export default class MoviesModel extends Observable {
  #movies = Array.from({length: 16}, generateFilm);

  get movies() {
    return this.#movies;
  }

  updateMovie = (update, updateType = 'PATCH') => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update non-existing movie');
    }
    this.#movies = [...this.#movies.slice(0, index), update, ...this.#movies.slice(index + 1)];
    this._notify(updateType, update);
  };
}
