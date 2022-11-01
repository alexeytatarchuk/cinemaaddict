import {render, remove} from "../utils/render";
import NoData from "../views/no-data";
import FilmContainer from "../views/film-container";
import FilmCard from "../views/film-card";
import FilmDetails from "../views/film-details";
import ShowMore from "../views/show-more";
import ContainerRated from "../views/container-rated";
import ContainerCommented from "../views/container-commented";
import Sorting from "../views/sorting";
import FilmsSection from "../views/films";
import FilmList from "../views/film-list";

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
    this._filmsDefault = null;
    this._changeSortType = this._changeSortType.bind(this);
  }

  _sortByRating() {
    return this._films.map((x) => x)
      .sort(function (a, b) {
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
      .sort(function (a, b) {
        if (a.year > b.year) {
          return -1;
        }
        if (a.year < b.year) {
          return 1;
        }
        return 0;
      });
  }

  _getTopCommented() {
    return this._films.map((x) => x)
      .sort(function (a, b) {
        if (a.comments > b.comments) {
          return -1;
        }
        if (a.comments < b.comments) {
          return 1;
        }
        return 0;
      });
  }

  _renderFilm(container, film) {
    const filmCard = new FilmCard(film);
    const filmDetails = new FilmDetails(film);
    const siteBody = document.querySelector(`body`);
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        hideFilmDetail();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
    const showFilmDetail = () => {
      siteBody.appendChild(filmDetails.getElement());
      filmDetails.setClickCloseHandler(hideFilmDetail);
      document.addEventListener(`keydown`, onEscKeyDown);
    };
    const hideFilmDetail = () => {
      siteBody.removeChild(filmDetails.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    };
    render(container, filmCard.getElement());
    filmCard.setClickHandler(showFilmDetail);
  }

  _renderFilmContainer(container, films) {
    const filmContainer = new FilmContainer();
    render(container, filmContainer);
    films.forEach((film) => this._renderFilm(filmContainer, film));
    return filmContainer;
  }

  _showMoreFilms(films) {
    films.slice(FILMS_COUNT_PER_STEP * this._renderedSteps, FILMS_COUNT_PER_STEP * (this._renderedSteps + 1)).forEach((film) => {
      this._renderFilm(this._filmContainer, film);
    });
    this._renderedSteps++;
    if (FILMS_COUNT_PER_STEP * this._renderedSteps >= films.length) {
      remove(this._showMore);
    }
  }

  _changeSortType(sortType) {
    switch (sortType) {
      case `rating`:
        this._films = this._sortByRating();
        break;
      case `date`:
        this._films = this._sortByDate();
        break;
      default:
        this._films = this._filmsDefault;
        break;
    }
    remove(this._filmContainer);
    remove(this._showMore);
    this._filmContainer = this._renderFilmContainer(this._filmList, this._films.slice(0, this._renderedSteps * FILMS_COUNT_PER_STEP));
    if (FILMS_COUNT_PER_STEP * this._renderedSteps < this._films.length) {
      render(this._filmList, this._showMore);
      this._showMore.setClickHandler(this._showMoreFilms.bind(this, this._films));
    }
  }

  render(films) {
    this._films = films;
    this._filmsDefault = films;
    render(this._container, this._sorting);
    this._sorting.changeSortTypeHandler(this._changeSortType);
    render(this._container, this._filmsSection);
    render(this._filmsSection, this._filmList);
    if (this._films.length > 0) {
      this._filmContainer = this._renderFilmContainer(this._filmList, this._films.slice(0, FILMS_COUNT_PER_STEP));
      if (this._films.length > FILMS_COUNT_PER_STEP) {
        render(this._filmList, this._showMore);
        this._renderedSteps++;
        this._showMore.setClickHandler(this._showMoreFilms.bind(this, this._films));
      }
      render(this._filmsSection, this._containerRated);
      render(this._filmsSection, this._containerCommented);
      this._renderFilmContainer(this._containerCommented, this._getTopCommented().slice(0, EXTRA_COUNT));
      this._renderFilmContainer(this._containerRated, this._sortByRating().slice(0, EXTRA_COUNT));
    } else {
      render(this._filmList, this._noData);
    }
  }
}
