import AbstractComponent from "./abstract";

export default class FooterStats extends AbstractComponent {
  constructor(count) {
    super();
    this._count = count;
  }
  getTemplate() {
    return `<p>${this._count} movies inside</p>`;
  }
}
