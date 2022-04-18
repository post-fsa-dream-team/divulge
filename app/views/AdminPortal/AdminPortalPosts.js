import AbstractView from "../AbstractView.js";
import Navbar from "../../components/Navbar.js";
import AdminSideNav from "../../components/AdminSideNav.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("Admin Portal Posts");
  }

  async getPosts() {
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
    let posts = await this.getPosts()
    function convertDate(date) {
      let splitIndex = date.split("").indexOf("T")
      let dayOnly = date.slice(0, splitIndex)
      let justDate = new Date(dayOnly).toString()
      return justDate.split(" ").slice(1, 4).join(" ")
    }

    return `
    ${AdminSideNav()}
    ${Navbar()}
    <h2 class="other-posts-title">ADMIN PORTAL > USERS</h2>
    <table class="admin-portal-posts-table">
      <thead>
        <tr>
          <td></td>
          <td>Post Title</td>
          <td>Author Username</td>
          <td>Author Email</td>
          <td>Date Created</td>
        </tr>
      </thead>

      <tbody>

      ${posts.map((post) =>
      `<tr>
        <td><img id="admin-portal-posts-image" src="${post.image_url}"/></td>
        <td>${post.title}</td>
        <td>${post.user_name}</td>
        <td>${post.email}</td>
        <td>${convertDate(post.created_at)}</td>
      </tr>
      `).join('')}

      </tbody>

     </table>
    `
  }

  async postRender() {
  }
}
