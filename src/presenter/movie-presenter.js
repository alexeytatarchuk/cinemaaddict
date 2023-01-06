import {render, replace, remove} from '../framework/render.js';
import MovieView from '../view/movie-view';
import MovieDetailsView from '../view/movie-details-view';
import {nanoid} from 'nanoid';

const Mode = {
  DEFAULT: 'DEFAULT', DETAIL: 'DETAIL',
};

export default class MoviePresenter {
  #movieListContainer = null;
  #changeData = null;
  #changeMode = null;
  #movieComponent = null;
  #movieDetailComponent = null;
  #movie = null;
  #mode = Mode.DEFAULT;

  constructor(movieListContainer, changeData, changeMode) {
    this.#movieListContainer = movieListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  get id() {
    return this.#movie.id;
  }

  init = (movie) => {
    this.#movie = movie;
    const prevMovieComponent = this.#movieComponent;
    const prevMovieDetailsComponent = this.#movieDetailComponent;
    this.#movieComponent = new MovieView(movie);
    this.#movieComponent.addToFavoriteClickHandler(this.#handleAddToFavoriteClick);
    this.#movieComponent.markAsWatchedClickHandler(this.#handleMarkAsWatchedClick);
    this.#movieComponent.addToWatchClickHandler(this.#handleAddToWatchClick);
    this.#movieComponent.showMovieDetailClickHandler(this.#handleShowMovieDetailClick);
    if (prevMovieComponent === null) {
      render(this.#movieComponent, this.#movieListContainer);
      return;
    } else {
      replace(this.#movieComponent, prevMovieComponent);
      if (this.#mode === Mode.DETAIL) {
        this.#handleShowMovieDetailClick();
      }
    }
    remove(prevMovieComponent);
    remove(prevMovieDetailsComponent);
  };

  #handleShowMovieDetailClick = () => {
    this.#changeMode();
    this.#movieDetailComponent = new MovieDetailsView(this.#movie);
    render(this.#movieDetailComponent, document.body);
    this.#movieDetailComponent.setClickCloseHandler(this.resetView);
    this.#movieDetailComponent.addToFavoriteClickHandler(this.#handleAddToFavoriteClick);
    this.#movieDetailComponent.addToWatchedClickHandler(this.#handleMarkAsWatchedClick);
    this.#movieDetailComponent.addToWatchlistClickHandler(this.#handleAddToWatchClick);
    this.#movieDetailComponent.setEmojiHandler();
    this.#movieDetailComponent.setCommentSubmitHandler(this.#addComment);
    this.#movieDetailComponent.setDeleteCommentClickHandler(this.#deleteComment);
    this.#movieDetailComponent.setCommentTextUpdateHandler();
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DETAIL;
  };

  resetView = () => {
    remove(this.#movieDetailComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #handleAddToWatchClick = () => {
    this.#changeData({...this.#movie, isInWatchList: !this.#movie.isInWatchList});
  };

  #handleMarkAsWatchedClick = () => {
    this.#changeData({...this.#movie, isWatched: !this.#movie.isWatched});
  };

  #handleAddToFavoriteClick = () => {
    this.#changeData({...this.#movie, isFavorite: !this.#movie.isFavorite});
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.resetView();
    }
  };

  #deleteComment = (commentId) => {
    this.#changeData({...this.#movie, comments: this.#movie.comments.filter((comment) => comment.id !== commentId)});
  };

  #addComment = (comment) => {
    const newComment = {
      id: nanoid(), emoji: comment.emoji, comment: comment.text, nickname: 'Movie Buff', dateComment: new Date()
    };
    this.#movie.comments.push(newComment);
    this.#changeData(this.#movie);
  };

  destroy = () => {
    remove(this.#movieComponent);
    remove(this.#movieDetailComponent);
  };
}

