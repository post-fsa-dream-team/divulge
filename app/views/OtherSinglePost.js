import Navbar from "../components/Navbar.js";
import AbstractView from "./AbstractView.js";
import SideNav from "../components/SideNav.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("OtherSinglePost");
    this.postId = params.id;
  }

  async getData (id) {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async getHtml() {
    const postArr = await this.getData(this.postId)
    let post = postArr[0]
    return `
    ${Navbar()}
    ${SideNav()}
      <div class='single-other-post-container'>
        <div class="single-other-post-title">${post.title}</div>
        <div class="single-other-post-username">${post.user_name}</div>
        <img class="single-other-post-img" src="${post.image_url}"/>
        <div class="single-other-post-content">${post.content}</div>
      </div>
    `
  }
}
