import AbstractView from '../framework/view/abstract-view';

export default class FilmsView extends AbstractView {
  get template() {
    return '<section class="films"> </section>';
  }
}
