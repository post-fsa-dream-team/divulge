import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("Admin Portal");
  }

  async getHtml() {

    return `
      <h2 class="other-posts-title">Posts >THIS IS THE ADMIN PORTAL</h2>
      `
  }

  async postRender() {
  }
}
