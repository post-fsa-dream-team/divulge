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


    // ${SideNav}
    // ${ Navbar }
    return `
    <div class="landingpage__header">
      <div id="nav">
        <h1>Divulge</h1>
        <p>Our Story</p>
        <p>Membership</p>
        <p>Write</p>
        <p>Sign In</p>
        <p>Sign Up</p>
      </div>
      <h1>Stay curious.</h1>
      <p>Discover stories, thinking and expertise from writers on any topic.</p>
      <button>Start reading</button>
    </div>
    <div class="landingpage__short">
      <p>Trending on Medium</p>
      <div id="highlight">
        <p>Story 1</p>
        <p>Story 2</p>
        <p>Story 3</p>
        <p>Story 4</p>
        <p>Story 5</p>
      </div>
    </div>
    <div class="landingpage__infinitescroll">
      <div class="landingpage__scrollstory>
        <p>Writer's name</p>
        <h1>Title</h1>
        <h2>This is a summary</h2>
        <p>MM/YYYY</p>
        <p>Reading Time</p>
        <p>tags</p>
        <p>Save</p>
        <img/>
      </div>
      <div class="landingpage__stickyright">
        <h1>Discover more of what matters to you</h1>
        <p>Tag 1</p>
        <p>Tag 2</p>
        <p>Tag 3</p>
        <p>Tag 4</p>
        <p>Tag 5</p>
        <p>Tag 6</p>
        <br>
        <div class="landingpage__helper">
          <p>Help</p>
          <p>Status</p>
          <p>Writers</p>
          <p>Blog</p>
          <p>Careers</p>
          <p>Privacy</p>
          <p>Terms</p>
          <p>About</p>
          <p>Knowable</p>
        </div>
      </div>
    </div>
    `
  }

  async postRender() {
  }

}
