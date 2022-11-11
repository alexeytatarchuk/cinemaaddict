import AbstractView from '../framework/view/abstract-view';

export default class ContainerCommentedView extends AbstractView {
  get template() {
    return `<section class="films-list--extra">
                <h2 class="films-list__title">Most commented</h2>
            </section>`;
  }
}

