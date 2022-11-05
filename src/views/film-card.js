import AbstractComponent from './abstract';

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
    this._handleMarkAsWatched = this._handleMarkAsWatched.bind(this);
    this._handleAddToWatch = this._handleAddToWatch.bind(this);
    this._handleAddToFavorite = this._handleAddToFavorite.bind(this);
  }

  getTemplate() {
    const returnActive = (item) => item ? 'film-card__controls-item--active' : '';
    return `
      <article class="film-card">
        <h3 class="film-card__title">${this._film.title}</h3>
        <p class="film-card__rating">${this._film.rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._film.year}</span>
          <span class="film-card__duration">${this._film.duration}</span>
          <span class="film-card__genre">${this._film.genre}</span>
        </p>
        <img src="${this._film.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${this._film.description}</p>
        <a class="film-card__comments">${this._film.comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${returnActive(this._film.isInWatchList)}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${returnActive(this._film.isWatched)}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite  ${returnActive(this._film.isFavorite)}">Mark as favorite</button>
        </form>
      </article>`;
  }

  setClickShowHandler(handler) {
    this.getElement().querySelector('img').addEventListener('click', handler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', handler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', handler);
  }

  _handleAddToWatch(evt) {
    evt.preventDefault();
    this._addToWatchClick();
  }

  _handleMarkAsWatched(evt) {
    evt.preventDefault();
    this._markAsWatchedClick();
  }

  _handleAddToFavorite(evt) {
    evt.preventDefault();
    this._addToFavoriteClick();
  }

  addToWatchClickHandler(handler) {
    this._addToWatchClick = handler;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._handleAddToWatch);
  }

  markAsWatchedClickHandler(handler) {
    this._markAsWatchedClick = handler;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._handleMarkAsWatched);
  }

  addToFavoriteClickHandler(handler) {
    this._addToFavoriteClick = handler;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._handleAddToFavorite);
  }
}

