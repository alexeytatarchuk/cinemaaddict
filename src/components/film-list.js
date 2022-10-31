import AbstractComponent from "./abstract";

export default class FilmList extends AbstractComponent {
  getTemplate() {
    return `<section class="films-list"></section>`;
  }
}
