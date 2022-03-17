import AbstractView from "./AbstractView.js";
import AllPostNavigation from "./AllPostNavigation.js";



export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("Home");
  }

  async getHtml() {
    // let getPosts = async () => {
    //   const options = {
    //      method: 'GET',
    //      headers: {
    //          'Content-Type': 'application/json'
    //      }
    //  };
    //  try {
    //      const response = await fetch("/posts")
    //      const json = await response.json();
    //      // console.log(json)
    //      return json
    //  } catch (err) {
    //      console.log('Error getting documents', err)
    //  }
    // }

    let myPosts = [{title: "post1", imageUrl: "https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-shaking-puppy.jpg?itok=4_quJCAy"}, {title: "post2", imageUrl: "https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-shaking-puppy.jpg?itok=4_quJCAy", content:"This is fake content"}, {title: "post3", imageUrl: "https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-shaking-puppy.jpg?itok=4_quJCAy", content:"This is fake content"}]

    return `
      <nav class="home-nav">
        <a href="/" class="home-nav-link" data-link>Dashboard</a>
        <a href="/posts" class="home-nav-link" data-link>Posts</a>
        <a href="/settings" class="home-nav-link" data-link>Settings</a>
      </nav>
      <h1 id="home-title">Welcome to Divulge</h1>
        <table id="all-posts-table">
            ${myPosts.map(post =>
              `<tr>
                <td class="image-cell"><img class="post-image" src=${post.imageUrl}/></td>
                <td>${post.title}</td>
                <td>${post.content}</td>
              </tr>`
                ).join('')}
        </table>
      `
  }
}
