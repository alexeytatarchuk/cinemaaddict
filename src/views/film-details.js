import {getDateComment} from '../utils.js';
import AbstractSmartComponent from './abstract-smart';

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._handleMarkAsWatched = this._handleMarkAsWatched.bind(this);
    this._handleAddToWatch = this._handleAddToWatch.bind(this);
    this._handleAddToFavorite = this._handleAddToFavorite.bind(this);
    this._handleClosePopup = this._handleClosePopup.bind(this);
    this.rerender = this.rerender.bind(this);
    this.recoveryListeners = this.recoveryListeners.bind(this);
  }

  getTemplate() {
    const {title, age, director, cast, country, writers, rating, year, duration, genre, poster, description, isInWatchList, isWatched, isFavorite, comments} = this._film;

    const generateComments = () => {
      let result = '';
      for (const comment of comments) {
        result += `<li class="film-details__comment">
                    <span class="film-details__comment-emoji">
                      <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-${comment.emoji}">
                    </span>
                    <div>
                      <p class="film-details__comment-text">${comment.comment}</p>
                      <p class="film-details__comment-info">
                        <span class="film-details__comment-author">${comment.nickname}</span>
                        <span class="film-details__comment-day">${getDateComment(comment.dateComment)}</span>
                        <button class="film-details__comment-delete">Delete</button>
                      </p>
                    </div>
                   </li>`;
      }
      return result;
    };

    const returnActive = (item) => item ? 'checked' : '';

    return `<section class="film-details">
              <form class="film-details__inner" action="" method="get">
                <div class="form-details__top-container">
                  <div class="film-details__close">
                    <button class="film-details__close-btn" type="button">close</button>
                  </div>
                  <div class="film-details__info-wrap">
                    <div class="film-details__poster">
                      <img class="film-details__poster-img" src="${poster}" alt="">
                      <p class="film-details__age">${age}</p>
                    </div>
                    <div class="film-details__info">
                      <div class="film-details__info-head">
                        <div class="film-details__title-wrap">
                          <h3 class="film-details__title">${title}</h3>
                          <p class="film-details__title-original">Original: ${title}</p>
                        </div>

                        <div class="film-details__rating">
                          <p class="film-details__total-rating">${rating}</p>
                        </div>
                      </div>
                      <table class="film-details__table">
                        <tr class="film-details__row">
                          <td class="film-details__term">Director</td>
                          <td class="film-details__cell">${director}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Writers</td>
                          <td class="film-details__cell">${writers}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Actors</td>
                          <td class="film-details__cell">${cast}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Release Date</td>
                          <td class="film-details__cell">${year}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Runtime</td>
                          <td class="film-details__cell">${duration}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Country</td>
                          <td class="film-details__cell">${country}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Genre</td>
                          <td class="film-details__cell">
                            ${genre}
                          </td>
                        </tr>
                      </table>
                      <p class="film-details__film-description">
                        ${description}
                      </p>
                    </div>
                  </div>
                  <section class="film-details__controls">
                    <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${returnActive(isInWatchList)}>
                    <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

                    <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${returnActive(isWatched)}>
                    <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

                    <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${returnActive(isFavorite)}>
                    <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
                  </section>
                </div>
                <div class="form-details__bottom-container">
                  <section class="film-details__comments-wrap">
                    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
                    <ul class="film-details__comments-list">
                      ${generateComments()}
                    </ul>
                    <div class="film-details__new-comment">
                      <div class="film-details__add-emoji-label"></div>
                      <label class="film-details__comment-label">
                        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                      </label>
                      <div class="film-details__emoji-list">
                        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                        <label class="film-details__emoji-label" for="emoji-smile">
                          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                        </label>
                        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                        <label class="film-details__emoji-label" for="emoji-sleeping">
                          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                        </label>
                        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                        <label class="film-details__emoji-label" for="emoji-puke">
                          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                        </label>
                        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                        <label class="film-details__emoji-label" for="emoji-angry">
                          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                        </label>
                      </div>
                    </div>
                  </section>
                </div>
              </form>
            </section>`;
  }

  recoveryListeners() {
    this.addToWatchClickHandler(this._addToWatchClick);
    this.markAsWatchedClickHandler(this._markAsWatchedClick);
    this.addToFavoriteClickHandler(this._addToFavoriteClick);
    this.setClickCloseHandler(this._closePopupClickHandler);
  }

  _handleAddToWatch(evt) {
    evt.preventDefault();
    this._addToWatchClick();
    this._film.isInWatchList = true;
    this.updateData(this._film);
  }

  _handleMarkAsWatched(evt) {
    evt.preventDefault();
    this._markAsWatchedClick();
    this._film.isWatched = !this._film.isWatched;
    this.updateData(this._film);
  }

  _handleAddToFavorite(evt) {
    evt.preventDefault();
    this._addToFavoriteClick();
    this._film.isFavorite = true;
    this.updateData(this._film);
  }

  _handleClosePopup(evt) {
    evt.preventDefault();
    this._closePopupClickHandler();
  }

  setClickCloseHandler(handler) {
    this._closePopupClickHandler = handler;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._handleClosePopup);
  }

  addToWatchClickHandler(handler) {
    this._addToWatchClick = handler;
    this.getElement().querySelector('.film-details__control-label--watchlist')
      .addEventListener('click', this._handleAddToWatch);
  }

  markAsWatchedClickHandler(handler) {
    this._markAsWatchedClick = handler;
    this.getElement().querySelector('.film-details__control-label--watched')
      .addEventListener('click', this._handleMarkAsWatched);
  }

  addToFavoriteClickHandler(handler) {
    this._addToFavoriteClick = handler;
    this.getElement().querySelector('.film-details__control-label--favorite')
      .addEventListener('click', this._handleAddToFavorite);
  }
}
