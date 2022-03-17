import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("Home");
  }

  async getHtml() {
    return `
    <h1>THIS IS THE HOME VIEW</h1>
    <p>
      Welcome to the home view.
    </p>`;
  }
}
