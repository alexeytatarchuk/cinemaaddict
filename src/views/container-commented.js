import AbstractComponent from './abstract';

export default class ContainerCommented extends AbstractComponent {
  getTemplate() {
    return `<section class="films-list--extra">
                <h2 class="films-list__title">Most commented</h2>
            </section>`;
  }
}

