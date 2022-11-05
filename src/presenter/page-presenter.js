import {render, remove} from '../utils/render';
import NoData from '../views/no-data';
import FilmContainer from '../views/film-container';
import ShowMore from '../views/show-more';
import ContainerRated from '../views/container-rated';
import ContainerCommented from '../views/container-commented';
import Sorting from '../views/sorting';
import FilmsSection from '../views/films';
import FilmList from '../views/film-list';
import MoviePresenter from './movie-presenter';

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_COUNT = 2;

export default class PagePresenter {
  #filmsModel = null;
  #container = null;
  #filmContainer = null;
  #sorting = new Sorting();
  #filmsSection = new FilmsSection();
  #filmList = new FilmList();
  #noData = new NoData();
  #showMore = new ShowMore();
  #containerRated = new ContainerRated();
  #containerCommented = new ContainerCommented();
  #renderedSteps = 0;
  #films = null;
  #filmsPresenter = [];
  #filmsPresenterExtra = [];

  constructor(container, films) {
    this.#filmsModel = films;
    this.#container = container;
    this.#changeSortType = this.#changeSortType.bind(this);
    this.#onDataChange = this.#onDataChange.bind(this);
    this.#onViewChange = this.#onViewChange.bind(this);
  }

  #sortByRating() {
    return this.#films.map((x) => x)
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

  #sortByDate() {
    return this.#films.map((x) => x)
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

  #sortByCommented() {
    return this.#films.map((x) => x)
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

  #renderFilmContainer(container, films) {
    const filmContainer = new FilmContainer();
    render(container, filmContainer);
    films.slice(0, FILMS_COUNT_PER_STEP).forEach((film) => this.#renderFilm(filmContainer, film));
    this.#renderedSteps++;
    if (films.length > FILMS_COUNT_PER_STEP) {
      render(this.#filmList, this.#showMore);
      this.#showMore.setClickHandler(this.#showMoreFilms.bind(this, films));
    }
    return filmContainer;
  }

  #renderFilm(container, film) {
    const movie = new MoviePresenter(container, this.#onDataChange, this.#onViewChange);
    movie.render(film);
    movie.id = film.id;
    this.#filmsPresenter.push(movie);
  }

  #showMoreFilms(films) {
    films.slice(FILMS_COUNT_PER_STEP * this
      .#renderedSteps, FILMS_COUNT_PER_STEP * (this.#renderedSteps + 1))
      .forEach((film) => this.#renderFilm(this.#filmContainer, film));
    this.#renderedSteps++;
    if (FILMS_COUNT_PER_STEP * this.#renderedSteps >= films.length) {
      remove(this.#showMore);
    }
  }

  #onDataChange(film, updatedFilm) {
    this.#filmsModel.updateMovie(updatedFilm.id, updatedFilm);
    this.#films = this.#filmsModel.movies;
    [...this.#filmsPresenter, ...this.#filmsPresenterExtra].map((movie) => {
      if (movie.id === film.id) {
        movie.rerender(film, updatedFilm);
      }
    });
  }

  #changeSortType(sortType) {
    const count = this.#renderedSteps * FILMS_COUNT_PER_STEP > this.#films.length ? this.#films.length : this.#renderedSteps * FILMS_COUNT_PER_STEP;
    this.#filmsPresenter.forEach((movie) => {
      movie.remove();
    });
    switch (sortType) {
      case 'date':
        this.#sortByDate().slice(0, count).forEach((film) => this.#renderFilm(this.#filmContainer, film));
        break;
      case 'rating':
        this.#sortByRating().slice(0, count).forEach((film) => this.#renderFilm(this.#filmContainer, film));
        break;
      default:
        this.#films.slice(0, count).forEach((film) => this.#renderFilm(this.#filmContainer, film));
    }
  }

  #onViewChange() {
    [...this.#filmsPresenter, ...this.#filmsPresenterExtra].forEach((movie) => {
      movie.setDefaultView();
    });
  }

  render() {
    this.#films = this.#filmsModel.movies;
    render(this.#container, this.#sorting);
    this.#sorting.changeSortTypeHandler(this.#changeSortType);
    render(this.#container, this.#filmsSection);
    render(this.#filmsSection, this.#filmList);
    if (this.#films.length > 0) {
      this.#filmContainer = this.#renderFilmContainer(this.#filmList, this.#films);
      render(this.#filmsSection, this.#containerRated);
      render(this.#filmsSection, this.#containerCommented);
      this.#renderFilmContainer(this.#containerCommented, this.#sortByCommented().slice(0, EXTRA_COUNT));
      this.#renderFilmContainer(this.#containerRated, this.#sortByRating().slice(0, EXTRA_COUNT));
      this.#filmsPresenterExtra = this.#filmsPresenter.slice(-EXTRA_COUNT * 2);
      this.#filmsPresenter = this.#filmsPresenter.slice(0, -EXTRA_COUNT * 2);
      this.#renderedSteps = this.#renderedSteps - 2;
    } else {
      render(this.#filmList, this.#noData);
    }
  }
}
