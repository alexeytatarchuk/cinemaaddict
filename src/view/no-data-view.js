import AbstractView from '../framework/view/abstract-view';

export default class NoDataView extends AbstractView {
  get template() {
    return '<h2 class="films-list__title">There are no movies in our database</h2>';
  }
}
