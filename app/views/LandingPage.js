import AbstractView from "./AbstractView.js";
import PostsView from "../components/PostsView.js";
import SideNav from "../components/SideNav.js"
import Navbar from "../components/Navbar.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("LandingPage");
  }

  async getData() {
    const response = await fetch("http://localhost:3000/api/posts");
    const data = await response.json();
    return data;
  }

  async getHtml() {
    console.log(this.state);
    let posts = await this.getData();


    return `
      ${Navbar()}
      ${SideNav()}
      `
  }

  async postRender() {
  }
}
