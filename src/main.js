'use strict';

const CARDS_COUNT = 5;
const EXTRA_COUNT = 2;
const NUM_RATED = 0;
const NUM_COMMENTED = 1;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);

const createUserProfile = () => {
  return `
  <section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

render(siteHeader, createUserProfile());


const siteMain = document.querySelector(`.main`);

const createMainNav = () => {
  return `
  <nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

render(siteMain, createMainNav());


const createSort = () => {
  return `
  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;
};

render(siteMain, createSort());


const createFilmsContainer = () => {
  return `
  <section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container">
    </div>
  </section>`;
};

render(siteMain, createFilmsContainer());

const siteFilmsSection = document.querySelector(`.films`);
const siteFilmsContainer = document.querySelector(`.films-list__container`);


const createFilmCard = () => {
  return `
  <article class="film-card">
    <h3 class="film-card__title">The Man with the Golden Arm</h3>
    <p class="film-card__rating">9.0</p>
    <p class="film-card__info">
      <span class="film-card__year">1955</span>
      <span class="film-card__duration">1h 59m</span>
      <span class="film-card__genre">Drama</span>
    </p>
    <img src="./images/posters/the-man-with-the-golden-arm.jpg" alt="" class="film-card__poster">
    <p class="film-card__description">Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…</p>
    <a class="film-card__comments">18 comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  film-card__controls-item--active">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`;
};

for (let i = 0; i < CARDS_COUNT; i++) {
  render(siteFilmsContainer, createFilmCard());
}

const createButton = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

render(siteFilmsContainer, createButton(), `afterend`);

const createExtraContainerRated = () => {
  return `
  <section class="films-list--extra">
  <h2 class="films-list__title">Top rated</h2>
  <div class="films-list__container"></div>
  </section>`;
};

const createExtraContainerCommented = () => {
  return `
  <section class="films-list--extra">
  <h2 class="films-list__title">Most commented</h2>
  <div class="films-list__container"></div>
  </section>`;
};

render(siteFilmsSection, createExtraContainerRated());
render(siteFilmsSection, createExtraContainerCommented());


const siteExtraContainers = document.querySelectorAll(`.films-list--extra`);
const siteExtraRatedContainer = siteExtraContainers[NUM_RATED].querySelector(`.films-list__container`);
const siteExtraCommentedContainer = siteExtraContainers[NUM_COMMENTED].querySelector(`.films-list__container`);

for (let i = 0; i < EXTRA_COUNT; i++) {
  render(siteExtraRatedContainer, createFilmCard());
  render(siteExtraCommentedContainer, createFilmCard());
}

const siteFooterStats = document.querySelector(`.footer__statistics`);

const createFooterStats = () => {
  return `<p>130 291 movies inside</p>`;
};

render(siteFooterStats, createFooterStats());
