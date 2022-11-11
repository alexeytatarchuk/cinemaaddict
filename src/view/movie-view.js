import AbstractView from '../framework/view/abstract-view';

export default class MovieView extends AbstractView {
  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    const {
      title, rating, year, duration, genre, poster, description, comments, isInWatchList, isWatched, isFavorite
    } = this.#movie;
    const returnActive = (item) => item ? 'film-card__controls-item--active' : '';
    return `
      <article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${year}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${returnActive(isInWatchList)}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${returnActive(isWatched)}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite  ${returnActive(isFavorite)}">Mark as favorite</button>
        </form>
      </article>`;
  }

  showMovieDetailClickHandler = (callback) => {
    this._callback.showMovieDetailClick = callback;
    this.element.querySelector('img').addEventListener('click', this.#handleShowMovieDetail);
    this.element.querySelector('.film-card__title').addEventListener('click', this.#handleShowMovieDetail);
    this.element.querySelector('.film-card__comments').addEventListener('click', this.#handleShowMovieDetail);
  };

  addToWatchClickHandler = (callback) => {
    this._callback.addToWatchClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#handleAddToWatch);
  };

  markAsWatchedClickHandler = (callback) => {
    this._callback.markAsWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#handleMarkAsWatched);
  };

  addToFavoriteClickHandler = (callback) => {
    this._callback.addToFavoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#handleAddToFavorite);
  };

  #handleShowMovieDetail = (evt) => {
    evt.preventDefault();
    this._callback.showMovieDetailClick();
  };

  #handleAddToWatch = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchClick();
  };

  #handleMarkAsWatched = (evt) => {
    evt.preventDefault();
    this._callback.markAsWatchedClick();
  };

  #handleAddToFavorite = (evt) => {
    evt.preventDefault();
    this._callback.addToFavoriteClick();
  };

}

