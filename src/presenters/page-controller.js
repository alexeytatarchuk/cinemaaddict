import {render, remove} from '../utils/render';
import NoData from '../views/no-data';
import FilmContainer from '../views/film-container';
import ShowMore from '../views/show-more';
import ContainerRated from '../views/container-rated';
import ContainerCommented from '../views/container-commented';
import Sorting from '../views/sorting';
import FilmsSection from '../views/films';
import FilmList from '../views/film-list';
import MovieController from './movie-controller';

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_COUNT = 2;

export default class PageController {
  constructor(container) {
    this._container = container;
    this._filmContainer = null;
    this._sorting = new Sorting();
    this._filmsSection = new FilmsSection();
    this._filmList = new FilmList();
    this._noData = new NoData();
    this._showMore = new ShowMore();
    this._containerRated = new ContainerRated();
    this._containerCommented = new ContainerCommented();
    this._renderedSteps = 0;
    this._films = null;
    this._filmsPresenter = [];
    this._changeSortType = this._changeSortType.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  _sortByRating() {
    return this._films.map((x) => x)
      .sort((a, b) => {
        if (a.rating > b.rating) {
          return -1;
        }
        if (a.rating < b.rating) {
          return 1;
        }
        return 0;
      });
  }

  _sortByDate() {
    return this._films.map((x) => x)
      .sort((a, b) => {
        if (a.year > b.year) {
          return -1;
        }
        if (a.year < b.year) {
          return 1;
        }
        return 0;
      });
  }

  _sortByCommented() {
    return this._films.map((x) => x)
      .sort((a, b) => {
        if (a.comments > b.comments) {
          return -1;
        }
        if (a.comments < b.comments) {
          return 1;
        }
        return 0;
      });
  }

  _renderFilmContainer(container, films) {
    const filmContainer = new FilmContainer();
    render(container, filmContainer);
    films.slice(0, FILMS_COUNT_PER_STEP).forEach((film) => this._renderFilm(filmContainer, film));
    this._renderedSteps++;
    if (films.length > FILMS_COUNT_PER_STEP) {
      render(this._filmList, this._showMore);
      this._showMore.setClickHandler(this._showMoreFilms.bind(this, films));
    }
    return filmContainer;
  }

  _renderFilm(container, film) {
    const movie = new MovieController(container, this._onDataChange, this._onViewChange);
    movie.render(film);
    movie.id = film.id;
    this._filmsPresenter.push(movie);
  }

  _showMoreFilms(films) {
    films.slice(FILMS_COUNT_PER_STEP * this._renderedSteps, FILMS_COUNT_PER_STEP * (this._renderedSteps + 1))
      .forEach((film) => this._renderFilm(this._filmContainer, film));
    this._renderedSteps++;
    if (FILMS_COUNT_PER_STEP * this._renderedSteps >= films.length) {
      remove(this._showMore);
    }
  }

  _onDataChange(film, updatedFilm) {
    this._filmsModel.updateMovie(updatedFilm.id, updatedFilm);
    this._films = this._filmsModel.getMovies();
    [...this._filmsPresenter, ...this._filmsPresenterExtra].map((movie) => {
      if (movie.id === film.id) {
        movie.rerender(film, updatedFilm);
      }
    });
  }

  _changeSortType(sortType) {
    const count = this._renderedSteps * FILMS_COUNT_PER_STEP > this._films.length ? this._films.length : this._renderedSteps * FILMS_COUNT_PER_STEP;
    this._filmsPresenter.forEach((movie) => {
      movie.remove();
    });
    switch (sortType) {
      case 'date':
        this._sortByDate().slice(0, count).forEach((film) => this._renderFilm(this._filmContainer, film));
        break;
      case 'rating':
        this._sortByRating().slice(0, count).forEach((film) => this._renderFilm(this._filmContainer, film));
        break;
      default:
        this._films.slice(0, count).forEach((film) => this._renderFilm(this._filmContainer, film));
    }
  }

  _onViewChange() {
    [...this._filmsPresenter, ...this._filmsPresenterExtra].forEach((movie) => {
      movie.setDefaultView();
    });
  }

  render(films) {
    this._filmsModel = films;
    this._films = this._filmsModel.getMovies();
    render(this._container, this._sorting);
    this._sorting.changeSortTypeHandler(this._changeSortType);
    render(this._container, this._filmsSection);
    render(this._filmsSection, this._filmList);
    if (this._films.length > 0) {
      this._filmContainer = this._renderFilmContainer(this._filmList, this._films);
      render(this._filmsSection, this._containerRated);
      render(this._filmsSection, this._containerCommented);
      this._renderFilmContainer(this._containerCommented, this._sortByCommented().slice(0, EXTRA_COUNT));
      this._renderFilmContainer(this._containerRated, this._sortByRating().slice(0, EXTRA_COUNT));
      this._filmsPresenterExtra = this._filmsPresenter.slice(-EXTRA_COUNT * 2);
      this._filmsPresenter = this._filmsPresenter.slice(0, -EXTRA_COUNT * 2);
      this._renderedSteps = this._renderedSteps - 2;
    } else {
      render(this._filmList, this._noData);
    }
  }
}
