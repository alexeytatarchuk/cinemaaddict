import {getDateComment} from '../utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

export default class MovieDetailsView extends AbstractStatefulView {
  #movie = null;
  #closeMovieDetailClickHandler = null;
  #comment = {text: null, emoji: null};

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    const {
      title,
      age,
      director,
      cast,
      country,
      writers,
      rating,
      year,
      duration,
      genre,
      poster,
      description,
      isInWatchList,
      isWatched,
      isFavorite,
      comments
    } = this.#movie;

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
                        <button class="film-details__comment-delete" data-comment-id="${comment.id}">Delete</button>
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

  _restoreHandlers = () => {
    this.setClickCloseHandler(this.#closeMovieDetailClickHandler);
    this.addToFavoriteClickHandler(this.#handleAddToFavorite);
    this.addToWatchlistClickHandler(this.#handleAddToWatchlist);
    this.addToWatchedClickHandler(this.#handleAddToWatched);
    this.setEmojiHandler();
    this.setCommentSubmitHandler(this._callback.commentSubmit);
    this.setDeleteCommentClickHandler(this._callback.commentDelete);
    this.setCommentTextUpdateHandler();
  };

  #handleAddToFavorite = (evt) => {
    evt.preventDefault();
    this._callback.addToFavoriteClick();
  };

  #handleAddToWatched = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchedClick();
  };

  #handleAddToWatchlist = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchlistClick();
  };

  addToFavoriteClickHandler(handler) {
    this._callback.addToFavoriteClick = handler;
    this.element.querySelector('#favorite').addEventListener('change', this.#handleAddToFavorite);
  }

  addToWatchedClickHandler(handler) {
    this._callback.addToWatchedClick = handler;
    this.element.querySelector('#watched').addEventListener('change', this.#handleAddToWatched);
  }

  addToWatchlistClickHandler(handler) {
    this._callback.addToWatchlistClick = handler;
    this.element.querySelector('#watchlist').addEventListener('change', this.#handleAddToWatchlist);
  }

  #handleEmojiClick = (evt) => {
    const emoji = evt.target.value;
    const img = document.createElement('img');
    img.setAttribute('src', `./images/emoji/${emoji}.png`);
    img.setAttribute('height', '55');
    img.setAttribute('width', '55');
    img.setAttribute('alt', `emoji-${emoji}`);
    this.element.querySelector('.film-details__add-emoji-label').replaceChildren(img);
    this.#comment.emoji = emoji;
  };

  setEmojiHandler() {
    this.element.querySelectorAll('.film-details__emoji-item').forEach((el) => {
      el.addEventListener('change', this.#handleEmojiClick);
    });
  }

  #commentSubmitHandler = (evt) => {
    const commentForm = this.element.querySelector('form');
    const commentTextarea = commentForm.elements['comment'];
    if ((evt.ctrlKey || evt.metaKey) && evt.code === 'Enter') {
      if (this.#comment.text && this.#comment.emoji) {
        this._callback.commentSubmit(this.#comment);
        this.#comment = {text: null, emoji: null};
      } else {
        commentTextarea.setCustomValidity('Please select an emotion and write a comment text');
        commentTextarea.reportValidity();
      }
    }
  };

  #handleDeleteComment = (evt) => {
    evt.preventDefault();
    this._callback.commentDelete(evt.target.dataset.commentId);
  };

  setDeleteCommentClickHandler(callback) {
    this._callback.commentDelete = callback;
    this.element.querySelectorAll('.film-details__comment-delete').forEach((deleteButton) => {
      deleteButton.addEventListener('click', this.#handleDeleteComment);
    });
  }

  setCommentSubmitHandler(callback) {
    this._callback.commentSubmit = callback;
    document.addEventListener('keydown', this.#commentSubmitHandler);
  }

  #commentChangeHandler = (evt) => {
    this.#comment.text = evt.target.value;
  };

  setCommentTextUpdateHandler() {
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentChangeHandler);
  }

  #handleClosePopup = (evt) => {
    evt.preventDefault();
    this._callback.closeMovieDetailClickHandler();
  };

  setClickCloseHandler(handler) {
    this._callback.closeMovieDetailClickHandler = handler;
    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#handleClosePopup);
  }
}


