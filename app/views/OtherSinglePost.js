import Navbar from "../components/Navbar.js";
import AbstractView from "./AbstractView.js";
import SideNav from "../components/SideNav.js";
import DeletePost from "../components/DeletePost.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("OtherSinglePost");
    this.postId = params.id;
    this.deletePost = new DeletePost(params.id);
    this.sessionId = sessionStorage.getItem('id');
    this.postData = [];
  }

  async getData (id) {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`)
      const data = await response.json()
      this.postData = data[0];
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async getHtml() {
    const postArr = await this.getData(this.postId)
    let post = postArr[0]

    function convertDate(date) {
      let splitIndex = date.split("").indexOf("T")
      let dayOnly = date.slice(0, splitIndex)
      let justDate = new Date(dayOnly).toString()
      return justDate.split(" ").slice(1, 4).join(" ")
    }

    function getMinRead(content) {
      return Math.ceil(content.length / 500)
    }

    const protocol = document.location.protocol;
    const host = document.location.host;
    const url = `${protocol}//${host}/editpost/${this.postId}`; // may need to change this once code is refactored
    const displayDeleteEdit = parseInt(this.sessionId) === post.user_id ?
        `<div id="button-containers"><a id="edit-link" href="${url}">Edit</a>${this.deletePost.render()}</div>` :
        `<div></div>`;

    return `
    ${Navbar()}
    ${SideNav}
      <div class='single-other-post-container'>
        <div class="single-other-date-and-read">
          <span class="single-other-post-date">${convertDate(post.created_at)}</span>
          <span class="single-other-post-min-read"> • ${getMinRead(post.content)} Min Read</span>
        </div>
        <div class="single-other-post-title">${post.title}</div>
        <div class="single-other-post-username">${post.user_name}</div>
        <img class="single-other-post-img" src="${post.image_url}"/>
        <div class="single-other-post-content">${post.content}</div>
        ${displayDeleteEdit}
      </div>

    `
  }
  async postRender() {
    parseInt(this.sessionId) === this.postData.user_id && this.deletePost.script();
  }
}
