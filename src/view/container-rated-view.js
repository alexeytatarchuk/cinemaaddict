import AbstractView from '../framework/view/abstract-view';

export default class ContainerRatedView extends AbstractView {
  get template() {
    return `
      <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
      </section>`;
  }
}
