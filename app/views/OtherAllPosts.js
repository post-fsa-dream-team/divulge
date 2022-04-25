import AbstractView from "./AbstractView.js";
import PostsView from "../components/PostsView.js"
import NoPostsView from "../components/NoPostsView.js"
import SideNav from "../components/SideNav.js"
import Navbar from "../components/Navbar.js";
import RightNav from "../components/RightNav.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle(`Divulge | ${params.category.toUpperCase()}`)
    this.category = params.category.split("/").slice(0,1).join('')
    this.userid = params.category.split("/").slice(1).join('')
    this.RightNav = new RightNav()

    this.getData = this.getData.bind(this)
    this.filterPosts = this.filterPosts.bind(this)

  }

  // filterPosts (posts, category) {
  //   return posts.filter((post) => {
  //     for (let key in post) {
  //       if (key === "category") {
  //         return post[key] === category
  //       }
  //     }
  //   })
  // }

  filterPosts (posts, category, userid) {
    if (userid === undefined) {
      return posts.filter((post) => {
        for (let key in post) {
          if (key === "category") {
            return post[key] === category
          }
        }
      })
    }

     else {
      return posts.filter((post) => {
        for (let key in post) {
          if (key === "user_id") {
            return post[key] === parseInt(userid)
          }
        }
      })
     }
  }

  async getData() {
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
    let posts = await this.getData()

    // posts/all/sports
    if (this.category !== "all" && !this.userid) {
      posts = this.filterPosts(posts, this.category)

    // posts/all/all/3
    } else if (this.category === "all" && this.userid) {
      posts = this.filterPosts(posts, undefined, this.userid)
    }

    let categoryArr = this.category.split("")
    let firstLetter = categoryArr[0].toUpperCase()
    let restOfWord = categoryArr.slice(1).join("")
    let capitalCase = firstLetter + restOfWord

    return `
      <div class="other-posts-container">

      ${Navbar()}

      <div class="other-posts-sidenav">
      ${SideNav()}
      </div>

      <div class="other-posts-posts">
      ${!posts.length ? NoPostsView(posts, capitalCase, this.userid) : PostsView(posts, capitalCase, this.userid)}
      </div>

      <div class="other-posts-right-nav">
      ${await this.RightNav.render()}
      </div>
      </div>
      `
  }

  async postRender() {
  }
}
