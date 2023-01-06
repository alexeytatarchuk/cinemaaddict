import Observable from '../framework/observable';
import {UpdateType} from '../const.js';

export default class MoviesModel extends Observable {
  #moviesApiService = null;
  #movies = [];

  constructor(moviesApiService) {
    super();
    this.#moviesApiService = moviesApiService;
  }

  get movies() {
    return this.#movies;
  }

  init = async () => {
    try {
      const movies = await this.#moviesApiService.movies;
      this.#movies = movies.map(this.#adaptToClient);
    } catch (err) {
      this.#movies = [];
    }
    this._notify(UpdateType.MINOR, this.#movies);
  };

  updateMovie = (update, updateType = 'PATCH') => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update non-existing movie');
    }
    this.#movies = [...this.#movies.slice(0, index), update, ...this.#movies.slice(index + 1)];
    this._notify(updateType, update);
  };

  #adaptToClient = (movie) => ({
    id: movie.id,
    title: movie.film_info.title,
    titleOriginal: movie.film_info.alternative_title,
    rating: movie.film_info.total_rating,
    releaseDate: new Date(movie.film_info.release.date),
    runtime: movie.film_info.runtime,
    country: movie.film_info.release.release_country,
    genre: movie.film_info.genre,
    director: movie.film_info.director,
    writers: movie.film_info.writers,
    cast: movie.film_info.actors,
    comments: movie.comments,
    poster: movie.film_info.poster,
    description: movie.film_info.description,
    isInWatchList: movie.user_details.watchlist,
    isWatched: movie.user_details.already_watched,
    isFavorite: movie.user_details.favorite,
    age: movie.film_info.age_rating
  });
}
