import AbstractView from "./AbstractView.js";
import PostsView from "../components/PostsView.js"
import SideNav from "../components/SideNav.js"

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("All Other Posts");
    this.state = {
      selectedCategory: "all posts"
    }
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
    console.log(this.state)
    let posts = await this.getData()
    if (this.state.selectedCategory !== "all posts") {
      posts = this.filterPosts(posts, this.state.selectedCategory)
    }

    return `
      ${SideNav()}
      ${PostsView(posts)}
      `
  }

  async postRender() {
    let elements = document.getElementsByClassName("home-nav-link")

    const changeSelection = (e) => {
      console.log(elements)
      console.log(this.state)
      console.log(`clicked on ${e}`)
      this.state.selectedCategory = e.target.text.toLowerCase()
      this.getHtml()
    }

    for (let i = 0; i < elements.length; i++){
      elements[i].addEventListener("click", async function(e) {
        e.preventDefault();
        changeSelection(e)
      }
    )
    }
  }
}
