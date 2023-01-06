import {render, remove} from '../framework/render.js';
import NoDataView from '../view/no-data-view';
import LoadMoreButtonView from '../view/load-more-button-view';
import ContainerRatedView from '../view/container-rated-view';
import ContainerCommentedView from '../view/container-commented-view';
import SortingView from '../view/sorting-view';
import FilmsSection from '../view/films-view';
import FilmListView from '../view/film-list-view';
import FilmContainerView from '../view/film-container-view';
import MoviePresenter from './movie-presenter';
import {filter} from '../utils/filter.js';
import {sortByDate, sortByRating, sortByComments} from '../utils/movie.js';
import {SortType, UpdateType, FilterType} from '../const.js';
import StatisticView from '../view/statistic-view';

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_COUNT = 2;

export default class PagePresenter {
  #movieModel = null;
  #container = null;
  #noMoviesComponent = null;
  #loadMoreButtonComponent = null;
  #currentSortType = SortType.DEFAULT;
  #filmsSection = new FilmsSection();
  #filmList = new FilmListView();
  #filmContainer = new FilmContainerView();
  #filmContainerExtraCommented = new FilmContainerView();
  #filmContainerExtraRated = new FilmContainerView();
  #filmContainerRated = new ContainerRatedView();
  #filmContainerCommented = new ContainerCommentedView();
  #statistic = new StatisticView();
  #renderedMoviesCount = FILMS_COUNT_PER_STEP;
  #pageMovies = [];
  #filterModel = null;
  #filterType = FilterType.ALL;
  #moviePresenter = [];
  #sortComponent = null;

  constructor(container, movies, filterModel) {
    this.#movieModel = movies;
    this.#container = container;
    this.#filterModel = filterModel;
    this.#movieModel.init();
    this.#movieModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get movies() {
    this.#filterType = this.#filterModel.filter;
    const filteredMovies = filter[this.#filterType](this.#movieModel.movies);
    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredMovies.sort(sortByDate);
      case SortType.RATING:
        return filteredMovies.sort(sortByRating);
      default:
        return filteredMovies;
    }
  }

  init = () => {
    this.#pageMovies = [...this.#movieModel.movies];
    this.#render();
  };

  get topRatedMovies() {
    return this.#movieModel.movies.sort(sortByRating).slice(0, EXTRA_COUNT);
  }

  get topCommentedMovies() {
    return this.#movieModel.movies.sort(sortByComments).slice(0, EXTRA_COUNT);
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#moviePresenter.forEach((moviePresenter) => {
          if (moviePresenter.id === data.id) {
            moviePresenter.init(data);
          }
        });
        break;
      case UpdateType.MINOR:
        this.#clearPage();
        this.init();
        break;
      case UpdateType.MODE:
        if (data) {
          this.#filmsSection.show();
          this.#sortComponent.show();
          this.#statistic.hide();
        } else {
          this.#filmsSection.hide();
          this.#sortComponent.hide();
          this.#statistic.show();
        }
    }
  };

  #renderNoMovies = () => {
    this.#noMoviesComponent = new NoDataView();
    render(this.#noMoviesComponent, this.#filmList.element);
  };

  #renderMovies = (movies) => {
    movies.forEach((movie) => this.#renderMovie(movie, this.#filmContainer.element));
  };

  #renderMovie = (movie, container) => {
    const moviePresenter = new MoviePresenter(container, this.#movieModel.updateMovie, this.#onViewChange);
    moviePresenter.init(movie);
    this.#moviePresenter.push(moviePresenter);
  };

  #renderLoadMoreButton = () => {
    this.#loadMoreButtonComponent = new LoadMoreButtonView();
    this.#loadMoreButtonComponent.setClickHandler(this.#handleLoadMoreButtonClick);
    render(this.#loadMoreButtonComponent, this.#filmList.element);
  };

  #handleLoadMoreButtonClick = () => {
    const moviesCount = this.movies.length;
    const newRenderedMoviesCount = Math.min(moviesCount, this.#renderedMoviesCount + FILMS_COUNT_PER_STEP);
    const movies = this.movies.slice(this.#renderedMoviesCount, newRenderedMoviesCount);
    this.#renderMovies(movies);
    this.#renderedMoviesCount = newRenderedMoviesCount;
    if (this.#renderedMoviesCount >= moviesCount) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  #onViewChange = () => {
    this.#moviePresenter.forEach((movie) => {
      movie.resetView();
    });
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPage();
    this.#render();
  };

  #renderSort = () => {
    this.#sortComponent = new SortingView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#container);
  };

  #clearPage = () => {
    this.#moviePresenter.forEach((presenter) => presenter.destroy());
    this.#moviePresenter = [];
    remove(this.#sortComponent);
    remove(this.#loadMoreButtonComponent);
    if (this.#noMoviesComponent) {
      remove(this.#noMoviesComponent);
    }
    this.#renderedMoviesCount = FILMS_COUNT_PER_STEP;
  };

  #render = () => {
    const movies = this.movies;
    const moviesCount = movies.length;
    render(this.#statistic, this.#container);
    this.#renderSort();
    render(this.#filmsSection, this.#container);
    render(this.#filmList, this.#filmsSection.element);
    if (this.#pageMovies.length === 0) {
      this.#renderNoMovies();
    } else {
      render(this.#filmContainer, this.#filmList.element);
      this.#renderMovies(movies.slice(0, Math.min(moviesCount, this.#renderedMoviesCount)));
      if (moviesCount > this.#renderedMoviesCount) {
        this.#renderLoadMoreButton();
      }
      render(this.#filmContainerRated, this.#filmsSection.element);
      render(this.#filmContainerExtraRated, this.#filmContainerRated.element);
      this.topRatedMovies.forEach((movie) => this.#renderMovie(movie, this.#filmContainerExtraRated.element));
      render(this.#filmContainerCommented, this.#filmsSection.element);
      render(this.#filmContainerExtraCommented, this.#filmContainerCommented.element);
      this.topCommentedMovies.forEach((movie) => this.#renderMovie(movie, this.#filmContainerExtraCommented.element));
    }
  };
}
