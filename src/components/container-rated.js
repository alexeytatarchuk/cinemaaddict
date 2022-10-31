import AbstractComponent from "./abstract";

export default class ContainerRated extends AbstractComponent {
  getTemplate() {
    return `
      <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
      </section>`;
  }
}
