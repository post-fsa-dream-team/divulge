import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("CreatePost");
    this.postResponse;
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
      if (!response.ok) throw new Error('Something wen wrong with post create request.');
      const resData = await response.json();
      this.postResponse = resData;
    } catch (error) {
      console.log('!!!Create post error!!!',  error);
    }
  }

  async getHtml() {

    let post;
    // console.log(document.getElementById("post-title"));
    // document.getElementById("postForm").addEventListener("submit", function(e) {
    //   const title = document.getElementById('title');
    //   console.log(title.value);
    //   post = {
    //     title: title.value,
    //     content:
    //   }
    //   if (input.value.trim() === "") {
    //     alert('Please fill in user name');
    //     input.focus();
    //     e.preventDefault(); // stop form submission
    //   }
    // });


    // This is dummy data to test the post from front end to back end.
    // const post = {
    //   title: 'Front end test',
    //   content: 'This is an attempt to reach the backend from the front end.',
    //   image_url: 'https://www.cookingclassy.com/wp-content/uploads/2018/07/salsa-17.jpg',
    //   category: 'food',
    //   user_id: '3'
    // }

    // await this.createPost(post);
    const finalPost = this.postResponse ? this.postResponse : post;

    return (`
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
}
