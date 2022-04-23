import AbstractView from "./AbstractView.js";
import PostsView from "../components/PostsView.js"
import NoPostsView from "../components/NoPostsView.js"
import SideNav from "../components/SideNav.js"
import Navbar from "../components/Navbar.js";
import RightNav from "../components/RightNav.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle(`Divulge | ${params.category.toUpperCase()}`)
    this.category = params.category

    this.getData = this.getData.bind(this)
    this.filterPosts = this.filterPosts.bind(this)
  }

  filterPosts (posts, category) {
    return posts.filter((post) => {
      for (let key in post) {
        if (key === "category") {
          return post[key] === category
        }
      }
    })
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
    let posts = await this.getData()
    if (this.category !== "all") {
      posts = this.filterPosts(posts, this.category)
    }

    let categoryArr = this.category.split("")
    let firstLetter = categoryArr[0].toUpperCase()
    let restOfWord = categoryArr.slice(1).join("")
    let capitalCase = firstLetter + restOfWord

    return `
      <div class="other-posts-container">

      ${Navbar()}

      <div class="other-posts-sidenav">
      ${SideNav()}
      </div>

      <div class="other-posts-posts">
      ${!posts.length ? NoPostsView(posts, capitalCase) : PostsView(posts, capitalCase)}
      </div>

      <div class="other-posts-right-nav">
      ${RightNav()}
      </div>
      </div>
      `
  }

  async postRender() {
  }
}
