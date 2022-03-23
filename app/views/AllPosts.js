import AbstractView from "./AbstractView.js";
import PostsView from "./OtherPostViews/PostsView.js"

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("All Posts");
    this.state = {
      selectedCategory: "all posts"
    }
  }

  async getData() {
    const response = await fetch("http://localhost:3000/api/posts");
    const data = await response.json();
    return data;
  }

  async getHtml() {
    console.log(this.state)
    let posts = await this.getData()
    if (this.state.selectedCategory !== "all posts") {
      posts = this.filterPosts(posts, this.state.selectedCategory)
    }
    return `<nav class="home-nav">
    <a id="all-posts-link" data-link>All Posts</a>
    <div id="categories">By Category</div>
    <a value="news" class="home-nav-link" data-link>News</a>
    <a value="technology" class="home-nav-link" data-link>Technology</a>
    <a value="politics" class="home-nav-link" data-link>Politics</a>
    <a value="fashion" class="home-nav-link" data-link>Fashion</a>
    <a value="sports" class="home-nav-link" data-link>Sports</a>
  </nav>

  <div id="home-content">
      <div id="cards-container">

        ${PostsView(posts)}

      </div>
    </div>`
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
