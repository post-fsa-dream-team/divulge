import AbstractView from "../AbstractView.js";
import Navbar from "../../components/Navbar.js";
import AdminSideNav from "../../components/AdminSideNav.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("Admin Portal Posts");
  }

  async getHtml() {
    return `
      ${AdminSideNav}
      ${Navbar}
      <h2 class="other-posts-title">ADMIN PORTAL > POSTS</h2>
      `
  }

  async postRender() {
  }
}
