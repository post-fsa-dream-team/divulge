import Navbar from "../components/Navbar.js";
import AbstractView from "./AbstractView.js";
export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("CreatePost");
    this.postResponse = 'test';
    this.createPost = this.createPost.bind(this);
  }

  async createPost(post) {
    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      });
      if (!response.ok) throw new Error('Something went wrong with post create request.');
      const resData = await response.json();
      this.postResponse = resData;
      console.log('Create Successful');
      // console.log(this.postResponse);
    } catch (error) {
      console.log('!!!Create post error!!!',  error);
    }
  }

  async getHtml() {

    return (`
    ${Navbar()}
      <div>
        <nav class="home-nav">
        <div id="categories-title">Categories</div>
        <a href="" class="home-nav-link" data-link>Technology</a>
        <a href="" class="home-nav-link" data-link>Politics</a>
        <a href="" class="home-nav-link" data-link>Fashion</a>
      </nav>

      <div class="home-content">
        <h1 id="home-title">Welcome to Divulge</h1>
        <form id="postForm">
          <div>
            <label for="postTitle">Title: </label>
            <input id="post-title" type="text" name="postTitle" placeholder="Enter a title" value="" />
          </div>
          <div>
            <label for="postContent">Content: </label>
            <input id="post-content" type="text" name="postContent" placeholder="Enter content" value="" />
          </div>
          <div>
            <label for="postCategory">Category: </label>
            <input id="post-category" type="text" name="postCategory" placeholder="ie. technology, entertainment, etc." value="" />
          </div>
          <div>
            <label for="postImage">Image URL: </label>
            <input id="post-imageURL" type="text" name="postImage" placeholder="Enter Image URL" value="" />
          </div>
          <button type="submit">Submit Post</button>
        </form>
      </div>
      </div>

    `);
  }

  async postRender() {
    const createPost = this.createPost;
    document.getElementById("postForm").addEventListener("submit", async function(e) {
      e.preventDefault();
      const title = document.getElementById('post-title');
      const content = document.getElementById('post-content');
      const category = document.getElementById('post-category');
      const image_url = document.getElementById('post-imageURL');
      const post = {
        title: title.value,
        content: content.value,
        category: category.value,
        image_url: image_url.value,
        user_id: 2
      }
      if (category.value.trim() === "") {
        alert('Please fill in category');
        category.focus();
        return;
      }
      createPost(post);
    });
  }
}
