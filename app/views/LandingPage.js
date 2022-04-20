import AbstractView from "./AbstractView.js";
import PostsView from "../components/PostsView.js";
import SideNav from "../components/SideNav.js"
import Navbar from "../components/Navbar.js";
import secrets from "../secrets.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("LandingPage");
    this.getPosts = this.getPosts.bind(this)
  }

  async getPosts() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host':secrets.APIHOST,
          'X-RapidAPI-Key': secrets.APIKEY
        }
      };
      const delay = (t) => {
         new Promise(resolve => setTimeout(resolve, t));
    }
      const response =
      await fetch('https://community-hacker-news-v1.p.rapidapi.com/topstories.json?print=pretty', options)
      console.log("response", response);
      var data = await response.json()
      data = data.slice(0,10)
      let results = []
      for (let result of data) {
        await delay(500);
        await fetch(`https://community-hacker-news-v1.p.rapidapi.com/item/${result}.json?print=pretty`, options)
       .then(res => res.json())
       .then(res => {
         results.push(res);
        })
        .catch(err => console.log(err))
      }
      console.log(results)

      // console.log("data", data);
      return results;
    } catch (error) {
      console.log('CANNOT SEE DATA', error)
    }
  }

  async getHtml() {
    let posts = await this.getPosts();
    let admin = sessionStorage.getItem("is_admin")
    let user = sessionStorage.getItem("id")
    console.log("this is navbar")
    const userId = sessionStorage.getItem('id');
    const category = ["News", "Technology", "Politics", "Crime", "Entertainment", "Fashion", "Sports"]
    return `
    <div class="landingpage">
    <div class="landingpage__header">
      <div id="nav">
        <h2><a href="/home">Divulge</a></h2>
        <div id="nav__content">
          <span><a href="/">Our Story</a></span>
          <span><a>Membership</a></span>
          <span><a href="/signin">Write</a></span>
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
      ${posts.slice(0, 6).map(post => (
        post !== undefined &&
        `<div id="contentdetails">
        <p id="title">${post.title}</p>
      </div>`
      )).join('')}
      </div>
    </div>
      <div class="landingpage__infinitescroll">
        ${posts.map(post => (
          post !== undefined &&
          `<div id="scrollstory">
            <h1>${post.title}</h1>
            <p>${post.by}</p>
            <p>${post.text}</p>
            <div id="action">
            <p>created at ${new Date(post.time)}</p>
            <p>Tags: ${post.story}</p>
            <p>Save</p>
            </div>`
            )).join('')}
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

