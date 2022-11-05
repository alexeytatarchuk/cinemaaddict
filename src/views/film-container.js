import AbstractComponent from './abstract';

export default class FilmContainer extends AbstractComponent {
  getTemplate() {
    return '<div class="films-list__container"></div>';
  }
}
