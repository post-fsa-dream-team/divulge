import AbstractView from "./AbstractView.js";
import PostsView from "../components/PostsView.js";
import SideNav from "../components/SideNav.js"
import Navbar from "../components/Navbar.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Home");

    this.getData = this.getData.bind(this)
  }

  async getData() {
    const port = /localhost/.test(window.location.href)
    ? "http://localhost:3000/api"
    : "https://divulge-web-app.herokuapp.com/api";
    try {
      const response = await fetch(`${port}/posts`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  }

  async getHtml() {
    let posts = await this.getData();

    return `
      <div id="home-container">
      ${Navbar()}
      ${SideNav()}
        <div class="console-container">
        <div>
          <div class="text-typing">
            <p>Welcome to Divulge</p>
          </div>
          <hr id="title-line"></hr>
          </div>
        </div>
      ${PostsView(posts)}
      </div>
      `
  }

  async postRender() {
  }
}
