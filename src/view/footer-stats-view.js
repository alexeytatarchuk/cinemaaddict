import AbstractView from '../framework/view/abstract-view';

export default class FooterStatsView extends AbstractView{
  constructor(moviesModel) {
    super();
    this._count = moviesModel.movies.length;
  }

  get template() {
    return `<p>${this._count} movies inside</p>`;
  }
}
