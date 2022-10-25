import {createUserProfile} from "./components/user-profile";
import {createMainNav} from "./components/navigation";
import {createSort} from "./components/sorting";
import {createFilmsContainer} from "./components/film-container";
import {createFilmCard} from "./components/film-card";
import {createFooterStats} from "./components/footer-stats";
import {createExtraContainerRated} from "./components/conteiner-rated";
import {createExtraContainerCommented} from "./components/container-commented";
import {createButton} from "./components/button";
import {generateFilm} from "./mock/film";
import {getFilterCounts} from "./mock/filter";
import {generateTopRated, generateTopCommented} from "./mock/extra";

const CARDS_COUNT = 5;
const EXTRA_COUNT = 2;
const NUM_RATED = 0;
const NUM_COMMENTED = 1;
const FILMS_COUNT = 15;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);

render(siteHeader, createUserProfile());
render(siteMain, createMainNav(getFilterCounts(films)));
render(siteMain, createSort());
render(siteMain, createFilmsContainer());

const siteFilmsSection = document.querySelector(`.films`);
const siteFilmsContainer = document.querySelector(`.films-list__container`);

for (let i = 0; i < CARDS_COUNT; i++) {
  render(siteFilmsContainer, createFilmCard(films[i]));
}

render(siteFilmsContainer, createButton(), `afterend`);
render(siteFilmsSection, createExtraContainerRated());
render(siteFilmsSection, createExtraContainerCommented());

const siteExtraContainers = document.querySelectorAll(`.films-list--extra`);
const siteExtraRatedContainer = siteExtraContainers[NUM_RATED].querySelector(`.films-list__container`);
const siteExtraCommentedContainer = siteExtraContainers[NUM_COMMENTED].querySelector(`.films-list__container`);

for (let i = 0; i < EXTRA_COUNT; i++) {
  render(siteExtraRatedContainer, createFilmCard(generateTopRated(films)[i]));
  render(siteExtraCommentedContainer, createFilmCard(generateTopCommented(films)[i]));
}

const siteFooterStats = document.querySelector(`.footer__statistics`);

render(siteFooterStats, createFooterStats(FILMS_COUNT));
