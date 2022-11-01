import AbstractComponent from "./abstract";

export default class Films extends AbstractComponent {
  getTemplate() {
    return `
        <section class="films">
        </section>`;
  }
}
