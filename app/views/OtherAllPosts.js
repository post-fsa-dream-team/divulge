import AbstractView from "./AbstractView.js";
import PostsView from "../components/PostsView.js"
import NoPostsView from "../components/NoPostsView.js"
import SideNav from "../components/SideNav.js"
import Navbar from "../components/Navbar.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("All Other Posts");
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
    try {
      const response = await fetch("http://localhost:3000/api/posts");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  }

  async getHtml() {
    let posts = await this.getData()
    console.log(this.category)
    if (this.category !== "all") {
      posts = this.filterPosts(posts, this.category)
    }

    let categoryArr = this.category.split("")
    let firstLetter = categoryArr[0].toUpperCase()
    let restOfWord = categoryArr.slice(1).join("")
    let capitalCase = firstLetter + restOfWord

    return `
      ${Navbar()}
      ${SideNav()}
      <h2 class="other-posts-title">Posts > ${capitalCase}</h2>
      ${!posts.length ? NoPostsView(posts, capitalCase) : PostsView(posts, capitalCase)}

      `
  }

  async postRender() {
  }
}
