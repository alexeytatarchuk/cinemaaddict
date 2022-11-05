import {render} from './utils/render';
import {generateFilm} from './mock/film';
import {getFilterCounts} from './mock/filter';
import UserProfile from './views/user-profile';
import Navigation from './views/navigation';
import FooterStats from './views/footer-stats';
import PageController from './presenters/page-controller';
import Movies from './models/movies';

const FILMS_COUNT = 16;
const films = [...Array(FILMS_COUNT)].map(generateFilm);
const movies = new Movies(films);

const header = document.querySelector('.header');
render(header, new UserProfile().getElement());

const main = document.querySelector('.main');

render(main, new Navigation(getFilterCounts(films)).getElement());

new PageController(main).render(movies);

const siteFooterStats = document.querySelector('.footer__statistics');
render(siteFooterStats, new FooterStats(FILMS_COUNT).getElement());
