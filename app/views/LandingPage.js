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
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'medium2.p.rapidapi.com',
          'X-RapidAPI-Key': '536db59dfbmshc9f83e26eea07ffp15ca2ejsn6bd8fbc9fad7'
        }
      };

      const response = await fetch('https://medium2.p.rapidapi.com/latestposts/blockchain', options)
      const data = await response.json()
      console.log("data", data);
      return data;
    } catch (error) {
      console.log('CANNOT SEE DATA', error)
    }
  }

  async getHtml() {
    // let posts = await this.getPosts();
    // console.log("posts", posts);
    let admin = sessionStorage.getItem("is_admin")
    let user = sessionStorage.getItem("id")
    console.log("this is navbar")
    const userId = sessionStorage.getItem('id');
    let navContent = ["Our Story", "Membership", "Write"]
    return `
    <div class="landingpage">
    <div class="landingpage__header">
      <div id="nav">
        <h2><a href="/home">Divulge</a></h2>
        <div id="nav__content">
          <span><a>Our Story</a></span>
          <span><a>Membership</a></span>
          <span><a>Write</a></span>
          <span><a href="/signin">Sign In</a></span>
          <span><a href="/signup">Get Started</a></span>
        </div>
      </div>
      <div id="headline">
        <h1>Stay curious.</h1>
        <h2>Discover stories, thinking and expertise from writers on any topic.</h2>
        <button onclick="location.href='/signin'">Start Reading</button>
      </div>
    </div>
    <div class="landingpage__content">
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
        <div class="landingpage__scrollstory">
          <p>Writer's name</p>
          <h1>Title</h1>
          <h2>This is a summary</h2>
          <p>MM/YYYY</p>
          <p>Reading Time</p>
          <p>tags</p>
          <p>Save</p>
          <img />
        </div>
        <div class="landingpage__stickyright">
          <h1>Discover more of what matters to you</h1>
          <p>Tag 1</p>
          <p>Tag 2</p>
          <p>Tag 3</p>
          <p>Tag 4</p>
          <p>Tag 5</p>
          <p>Tag 6</p>
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
  </div>
    `
  }

  async postRender() {
  }

}

