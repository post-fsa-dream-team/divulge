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
    try {
      const response = await fetch("http://localhost:3000/api/posts");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  }

  async getUserData () {
    const userData = await fetch ("http://localhost:3000/api/loggedinuser")
    console.log(userData)
}

  async getHtml() {
    console.log(this.state);
    let posts = await this.getData();
    this.getUserData()


    return `
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
      `
  }

  async postRender() {
  }
}
