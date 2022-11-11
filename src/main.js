import {render} from './framework/render';
import PagePresenter from './presenter/page-presenter';
import MoviesModel from './model/movies-model';
import UserProfileView from './view/user-profile-view';
import FooterStatsView from './view/footer-stats-view';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';

const main = document.querySelector('.main');
const header = document.querySelector('.header');

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();
const pagePresenter = new PagePresenter(main, moviesModel, filterModel);
const filterPresenter = new FilterPresenter(main, filterModel, moviesModel);

filterPresenter.init();
pagePresenter.init();
render(new UserProfileView(), header);

const siteFooterStats = document.querySelector('.footer__statistics');
render(new FooterStatsView(moviesModel), siteFooterStats);
