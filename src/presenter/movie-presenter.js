import {render, replace, remove} from '../utils/render';
import FilmCard from '../views/film-card';
import FilmDetails from '../views/film-details';

export default class MoviePresenter {
  constructor(container, changeData, onViewChange) {
    this._container = container;
    this._film = null;
    this._filmCard = null;
    this._filmDetails = null;
    this._changeData = changeData;
    this.onViewChange = onViewChange;
    this._addToWatch = this._addToWatch.bind(this);
    this._addToFavorite = this._addToFavorite.bind(this);
    this._markAsWatched = this._markAsWatched.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._showFilmDetail = this._showFilmDetail.bind(this);
    this.setDefaultView = this.setDefaultView.bind(this);
  }

  _addToFavorite() {
    this._changeData(this._film, {...this._film, isFavorite: true});
  }

  _addToWatch() {
    this._changeData(this._film, {...this._film, isInWatchList: true});
  }

  _markAsWatched() {
    this._changeData(this._film, {...this._film, isWatched: !this._film.isWatched});
  }

  rerender(film, updatedFilm) {
    const updatedFilmCard = new FilmCard(updatedFilm);
    replace(this._filmCard, updatedFilmCard);
    this._film = updatedFilm;
    this._filmCard = updatedFilmCard;
    this._addListeners();
  }

  _onEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.setDefaultView();
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }

  _showFilmDetail() {
    this.onViewChange();
    this._filmDetails = new FilmDetails(this._film);
    document.querySelector('body').appendChild(this._filmDetails.getElement());
    this._filmDetails.setClickCloseHandler(this.setDefaultView);
    this._filmDetails.addToFavoriteClickHandler(this._addToFavorite);
    this._filmDetails.addToWatchClickHandler(this._addToWatch);
    this._filmDetails.markAsWatchedClickHandler(this._markAsWatched);
    document.addEventListener('keydown', this._onEscKeyDown);
  }

  _addListeners() {
    this._filmCard.setClickShowHandler(this._showFilmDetail);
    this._filmCard.addToFavoriteClickHandler(this._addToFavorite);
    this._filmCard.addToWatchClickHandler(this._addToWatch);
    this._filmCard.markAsWatchedClickHandler(this._markAsWatched);
  }

  setDefaultView() {
    if (this._filmDetails) {
      remove(this._filmDetails);
      this._filmDetails.removeElement();
    }
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  remove() {
    remove(this._filmCard);
    this._filmCard.removeElement();
  }

  render(film) {
    this._film = film;
    this._filmCard = new FilmCard(this._film);
    render(this._container, this._filmCard.getElement());
    this._addListeners();
  }
}

