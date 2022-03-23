import Navbar from "../components/Navbar.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("OtherSinglePost");
    this.postId = params.id;
  }

  async getData (id) {
    const response = await fetch(`http://localhost:3000/api/posts/${id}`)
    const data = await response.json()
    return data
  }

  async getHtml() {
    const postArr = await this.getData(this.postId)
    let post = postArr[0]
    return `
    ${Navbar()}
      <nav class="home-nav">
        <a id="all-posts-link" data-link>All Posts</a>
        <div id="categories">By Category</div>
        <a value="news" class="home-nav-link" data-link>News</a>
        <a value="technology" class="home-nav-link" data-link>Technology</a>
        <a value="politics" class="home-nav-link" data-link>Politics</a>
        <a value="fashion" class="home-nav-link" data-link>Fashion</a>
        <a value="sports" class="home-nav-link" data-link>Sports</a>
      </nav>
      <div class='body-content'>
        <h1 class="single-other-post-title">${post.title}</h1>
        <p class="user-name">By: ${post.user_name}<p>
        <img class="single-post-img" src="${post.image_url}"/>
        <p>${post.content}</p>
      </div>
    `
  }
}
