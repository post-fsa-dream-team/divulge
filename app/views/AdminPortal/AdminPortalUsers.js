import AbstractView from "../AbstractView.js";
import Navbar from "../../components/Navbar.js";
import AdminSideNav from "../../components/AdminSideNav.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("Admin Portal Users");
  }

  async getUsers () {
    try {
      let response = await fetch("http://localhost:3000/api/users")
      let data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async getHtml() {
    let users = await this.getUsers()

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
      <table class="admin-portal-user-table">
        <thead>
          <tr>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Username</td>
            <td>Email</td>
            <td>Date Joined</td>
          </tr>
        </thead>

        <tbody>

        ${users.map((user) =>
        `<tr>
          <td>${user.first_name}</td>
          <td>${user.last_name}</td>
          <td>${user.user_name}</td>
          <td>${user.email}</td>
          <td>${convertDate(user.created_at)}</td>
        </tr>
        `).join('')}

        </tbody>

       </table>
      `
  }

  async postRender() {
  }
}
