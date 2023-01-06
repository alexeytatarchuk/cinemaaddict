import {render} from './framework/render';
import PagePresenter from './presenter/page-presenter';
import MoviesModel from './model/movies-model';
import UserProfileView from './view/user-profile-view';
import FooterStatsView from './view/footer-stats-view';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import StatisticView from './view/statistic-view';
import MovieApiService from './movie-api-service';

const main = document.querySelector('.main');
const header = document.querySelector('.header');

const AUTHORIZATION = 'Basic VGhpcydzIG5vdCBhIHBhc3N3b3JkIDop';
const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict';

const movieApiService = new MovieApiService(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel(movieApiService);
const filterModel = new FilterModel();
const pagePresenter = new PagePresenter(main, moviesModel, filterModel);
const filterPresenter = new FilterPresenter(main, filterModel, moviesModel);

const statisticView = new StatisticView();
render(statisticView, main);

filterPresenter.init();
pagePresenter.init();
render(new UserProfileView(), header);

const siteFooterStats = document.querySelector('.footer__statistics');
render(new FooterStatsView(moviesModel), siteFooterStats);
