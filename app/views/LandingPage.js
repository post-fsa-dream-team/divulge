import AbstractView from "./AbstractView.js";
import PostsView from "../components/PostsView.js";
import SideNav from "../components/SideNav.js"
import Navbar from "../components/Navbar.js";
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Divulge | Home");
    this.getPosts = this.getPosts.bind(this)

  }

  async getPosts() {
    const port = /localhost/.test(window.location.href)
    ? "http://localhost:3000/api"
    : "https://divulge-web-app.herokuapp.com/api";
        try {
            const allPosts = await fetch(`${port}/posts/landingpage`)
            const data = await allPosts.json()
            // console.log("data", data);
            return data
        } catch (error) {
            console.log('CANNOT SEE MY POSTS :(', error);
        }
  }

  async getHtml() {
    let posts = await this.getPosts();
    let user = sessionStorage.getItem("id")
    const userId = sessionStorage.getItem('id');
    const category = ["News", "Technology", "Politics", "Crime", "Entertainment", "Fashion", "Sports"]
    const helper = ["Help","Status", "Writers","Blog","Careers", "Privacy", "Terms", "About", "Knowable"]

    return `
    <div class="landingpage">
    <div class="landingpage__header">
     ${Navbar()}
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
        post !== undefined && `<div id="contentdetails">
        <p id="title">${post.title}</p>
      </div>`
      )).join('')}
      </div>
    </div>
      <div class="landingpage__infinitescroll">
        <div id="scrollstory">
        ${posts.map(post => (
          post !== undefined && `
        <h1>${post.title}</h1>
        <p>@${post.by}</p>

        <div id="tags">
          <span>${post.type}</span>
          <span><a href="/signin">Save</a></span>
        </div>

        `
        )).join('')}
        </div>
        <div id="stickyright">
          <p style="text-transform:uppercase"><strong>Discover more of what matters to you</strong></p>
          <div id="tags">
          ${category.map(cat =>
            `
            <span>${cat}</span>
            `
            ).join('')}

          </div>
          <div id="helper">
          ${helper.map(help => `
          <span>${help}</span>
          `).join('')}

          </div>
        </div>
        </div>
        </div>
        </div>
    `
  }

  async postRender() {
    var myNav = document.getElementById("nav-bar-signed-out");

    window.onscroll = function() {
      "use strict";
      if(this.scrollY <= 10) myNav.className = ''; else myNav.className = 'scroll';
    };
  }

}



