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
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await response.json()
      console.log("data", data);
      return data;
    } catch (error) {
      console.log('CANNOT SEE DATA', error)
    }
  }

  async getHtml() {
    let posts = await this.getPosts();
    posts.slice(0, 6).map((post) => {console.log(post.title)})
    let admin = sessionStorage.getItem("is_admin")
    let user = sessionStorage.getItem("id")
    console.log("this is navbar")
    const userId = sessionStorage.getItem('id');
    // let navContent = ["Our Story", "Membership", "Write"]
    // ${posts.map((post, idx) => idx < 6).map(post => (
    //   `<p>${posts.title}</p>`
    // ))}
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
    <div id="highlight">
      <p><strong>Trending on Divulge</strong></p>
      <div id="highlightcontent">
      <div id="contentdetails">
        <p id="title">${posts[0].title}</p>
      </div>
      <div id="contentdetails">
        <p id="title">${posts[2].title}</p>
      </div>
      <div id="contentdetails">
        <p id="title">${posts[3].title}</p>
      </div>
      <div id="contentdetails">
        <p id="title">${posts[4].title}</p>
      </div>
      <div id="contentdetails">
        <p id="title">${posts[5].title}</p>
      </div>
      <div id="contentdetails">
        <p id="title">${posts[6].title}</p>
      </div>
      </div>
    </div>
      <div class="landingpage__infinitescroll">
        <div id="scrollstory">
          <p>Writer's name</p>
          <h1>Title</h1>
          <h2>This is a summary</h2>
          <div id="action">
          <p>MM/YYYY</p>
          <p>Reading Time</p>
          <p>tags</p>
          <p>Save</p>
          </div>
        </div>
        <div id="stickyright">
          <p style="text-transform:uppercase"><strong>Discover more of what matters to you</strong></p>
          <div id="tags">
          <span>Tag 1</span>
          <span>Tag 2</span>
          <span>Tag 3</span>
          <span>Tag 4</span>
          <span>Tag 5</span>
          <span>Tag 6</span>
          <span>Tag 1</span>
          <span>Tag 2</span>
          <span>Tag 3</span>
          <span>Tag 4</span>
          <span>Tag 5</span>
          <span>Tag 6</span>
          </div>
          <div id="helper">
            <span>Help</span>
            <span>Status</span>
            <span>Writers</span>
            <span>Blog</span>
            <span>Careers</span>
            <span>Privacy</span>
            <span>Terms</span>
            <span>About</span>
            <span>Knowable</span>
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

