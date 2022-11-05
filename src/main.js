import {render} from './utils/render';
import {getFilterCounts} from './mock/filter';
import UserProfile from './views/user-profile';
import Navigation from './views/navigation';
import FooterStats from './views/footer-stats';
import PagePresenter from './presenter/page-presenter';
import MoviesModel from './model/movies-model';

const main = document.querySelector('.main');
const header = document.querySelector('.header');

const moviesModel = new MoviesModel();
const pagePresenter = new PagePresenter(main, moviesModel);

pagePresenter.render();

//render(header, new UserProfile().getElement());

//render(main, new Navigation(getFilterCounts(films)).getElement());


const siteFooterStats = document.querySelector('.footer__statistics');
//render(siteFooterStats, new FooterStats(FILMS_COUNT).getElement());
