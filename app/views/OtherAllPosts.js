import AbstractView from "./AbstractView.js";
import PostsView from "../components/PostsView.js"
import SideNav from "../components/SideNav.js"

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("All Other Posts");
    this.category = params.category
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
      ${SideNav()}
      <h1>${this.category}</h1>
      ${PostsView(posts)}
      `
  }

  async postRender() {
  }
}
