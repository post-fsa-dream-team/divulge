import AbstractView from "./AbstractView.js";
import PostsView from "../components/PostsView.js";
import SideNav from "../components/SideNav.js"
import Navbar from "../components/Navbar.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("LandingPage");
  }

  async getPosts() {
    try {
      const data = await fetch("https://jsonplaceholder.typicode.com/posts").then(function (response) {
        if(response.ok) {
          return response.json()
        } else {
          return Promise.reject(response);
        };
      }).then(data => {
        console.log(data);
      }).catch(error => {
        console.log(error);
      });
      return data;
    } catch (error) {
      console.log('CANNOT SEE DATA', error)
    }
  }

  async getHtml() {
    let posts = await this.getPosts();
    console.log(posts);
    let admin = sessionStorage.getItem("is_admin")
    let user = sessionStorage.getItem("id")
    console.log("this is navbar")
    const userId = sessionStorage.getItem('id');
    // ${SideNav}
    // ${ Navbar }
    let navContent = ["Our Story", "Membership", "Write"]
    return `
    <div class="landingpage">
      <div class="landingpage__header">
        <div id="nav">
          <h2 href="/home">Divulge</h2>
          <div id="nav__content">
            <span>Our Story</span>
            <span>Membership</span>
            <span>Write</span>
            <span><a href="/signin" class="nav-link">Sign In</a></span>
            <span><a href="/signup" class="nav-link">Get Started</a></span>
          </div>
        </div>
        <h1>Stay curious.</h1>
        <h2>Discover stories, thinking and expertise from writers on any topic.</h2>
        <button><a href="/signin" class="nav-link">Start Reading</a></button>
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
    </div>
    `
  }

  async postRender() {
  }

}
