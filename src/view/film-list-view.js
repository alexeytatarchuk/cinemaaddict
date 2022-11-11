import AbstractView from '../framework/view/abstract-view';

export default class FilmListView extends AbstractView {
  get template() {
    return '<section class="films-list"></section>';
  }
}
