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
      <div class='body-content'>
        <h1 class="single-other-post-title">${post.title}</h1>
        <p class="user-name">By: ${post.user_name}<p>
        <img class="single-post-img" src="${post.image_url}"/>
        <p>${post.content}</p>
      </div>
    `
  }
}
