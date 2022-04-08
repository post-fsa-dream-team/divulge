import AbstractView from "./AbstractView.js";
import PostsView from "../components/PostsView.js";
import SideNav from "../components/SideNav.js"
import Navbar from "../components/Navbar.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("My Profile");

  }

  async getMyProfile() {
    try {
      const userId = sessionStorage.getItem("id");
      const myProfile = await fetch(`http://localhost:3000/api/users/${userId}`);
      if (myProfile.ok) {
        const data = await myProfile.json();
        return data;
      } else {
        console.log(myProfile.status, myProfile.statusText);
      }
    } catch (error) {
      console.log("CANNOT SEE MY PROFILE", error)
    }
  }

  async getMyPosts(userId) {
    try {
      const myPosts = await fetch(`http://localhost:3000/api/users/${userId}/posts`)
      if (myPosts.ok) {
        const data = await myPosts.json()
        // console.log(data);
        return data
      } else {
        console.log(myPosts.status, myPosts.statusText)
      }
    } catch (error) {
      console.log('CANNOT SEE MY POST :(', error);
    }
  }

  async getHtml() {
    // let posts = await this.getMyPost();
    // ${PostsView(posts)}
    // ${Navbar()}
    // ${SideNav()}
    let userInfo = await this.getMyProfile();
    let myPosts = await this.getMyPosts(3)
    return `
    <div>My Profile</div>
    <div>${userInfo.user_name}</div>
    <div>${userInfo.first_name}</div>
    <div>${userInfo.last_name}</div>
    <div>${userInfo.email}</div>
    <div>${userInfo.location}</div>
    <div>${userInfo.birth_date}</div>
    <div>${userInfo.created_at}</div>
    <div>${userInfo.last_login}</div>
    <div>My Posts
    ${userInfo.id === myPosts.user_id ?
        `${myPosts.map(post => {
          return `
          <div>${post.title}</div>
          <div>${post.image_url}</div>
          <div>${post.content}</div>
          <div>${post.created_at}</div>
          <div>${post.category}</div>`
        })}` : '<div>No posts yet!</div>'
      }
  </div>


    `
  }

  async postRender() {
  }
}
