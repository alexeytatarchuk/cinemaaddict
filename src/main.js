import {render} from "./utils";
import {generateFilm} from "./mock/film";
import {getFilterCounts} from "./mock/filter";
import {generateTopRated, generateTopCommented} from "./mock/extra";
import UserProfile from "./components/user-profile";
import Navigation from "./components/navigation";
import Sorting from "./components/sorting";
import FooterStats from "./components/footer-stats";
import FilmList from "./components/film-list";
import NoData from "./components/no-data";
import FilmContainer from "./components/film-container";
import FilmCard from "./components/film-card";
import ShowMore from "./components/show-more";
import ContainerRated from "./components/container-rated";
import ContainerCommented from "./components/container-commented";
import Films from "./components/films";
import FilmDetails from "./components/film-details";

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_COUNT = 2;
const NUM_RATED = 0;
const NUM_COMMENTED = 1;
const FILMS_COUNT = 16;

const films = new Array(FILMS_COUNT).fill(0, 0).map(generateFilm);

const siteHeader = document.querySelector(`.header`);

render(siteHeader, new UserProfile().getElement());

const siteMain = document.querySelector(`.main`);

render(siteMain, new Navigation(getFilterCounts(films)).getElement());
render(siteMain, new Sorting().getElement());
render(siteMain, new Films().getElement());

const siteFilmsSection = document.querySelector(`.films`);

render(siteFilmsSection, new FilmList().getElement());

const siteFilmsListSection = document.querySelector(`.films-list`);

const renderFilm = (container, film) => {
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
    filmDetails.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, hideFilmDetail);
    document.addEventListener(`keydown`, onEscKeyDown);
  };
  const hideFilmDetail = () => {
    siteBody.removeChild(filmDetails.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  };
  render(container, filmCard.getElement());
  filmCard.getElement().querySelector(`img`).addEventListener(`click`, showFilmDetail);
  filmCard.getElement().querySelector(`.film-card__title`).addEventListener(`click`, showFilmDetail);
  filmCard.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, showFilmDetail);
};

if (FILMS_COUNT > 0) {
  render(siteFilmsListSection, new FilmContainer().getElement());
  const siteFilmsContainer = document.querySelector(`.films-list__container`);
  for (let i = 0; i < FILMS_COUNT_PER_STEP; i++) {
    renderFilm(siteFilmsContainer, films[i]);
  }
  if (films.length > FILMS_COUNT_PER_STEP) {
    let renderedTaskCount = FILMS_COUNT_PER_STEP;
    render(siteFilmsListSection, new ShowMore().getElement());
    const loadMoreButton = document.querySelector(`.films-list__show-more`);
    loadMoreButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      films
        .slice(renderedTaskCount, renderedTaskCount + FILMS_COUNT_PER_STEP)
        .forEach((film) => renderFilm(siteFilmsContainer, film));
      renderedTaskCount += FILMS_COUNT_PER_STEP;
      if (renderedTaskCount >= films.length) {
        loadMoreButton.remove();
      }
    });
  }
  render(siteFilmsSection, new ContainerRated().getElement());
  render(siteFilmsSection, new ContainerCommented().getElement());
  const siteExtraContainers = document.querySelectorAll(`.films-list--extra`);
  const siteExtraRatedContainer = siteExtraContainers[NUM_RATED].querySelector(`.films-list__container`);
  const siteExtraCommentedContainer = siteExtraContainers[NUM_COMMENTED].querySelector(`.films-list__container`);
  for (let i = 0; i < EXTRA_COUNT; i++) {
    renderFilm(siteExtraRatedContainer, generateTopRated(films)[i]);
    renderFilm(siteExtraCommentedContainer, generateTopCommented(films)[i]);
  }
} else {
  render(siteFilmsSection, new NoData().getElement());
}

const siteFooterStats = document.querySelector(`.footer__statistics`);
render(siteFooterStats, new FooterStats(FILMS_COUNT).getElement());
