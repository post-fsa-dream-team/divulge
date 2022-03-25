import AbstractView from "./AbstractView.js";
import Navbar from "../components/Navbar.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("Admin Portal");
  }

  async getHtml() {

    return `
      ${Navbar}
      <h2 class="other-posts-title">THIS IS THE ADMIN PORTAL</h2>
      `
  }

  async postRender() {
  }
}
