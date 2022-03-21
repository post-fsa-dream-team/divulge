import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("CreatePost");
  }

  async getHtml() {

    let postResponse;
    const createPost = async (post) => {
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
        postResponse = resData;
      } catch (error) {
        console.log('!!!Create post error!!!',  error);
      }
    }
    // This is dummy data to test the post from front end to back end.
    const post = {
      title: 'Front end test',
      content: 'This is an attempt to reach the backend from the front end.',
      image_url: 'https://www.cookingclassy.com/wp-content/uploads/2018/07/salsa-17.jpg',
      category: 'food',
      user_id: '3'
    }
    // await createPost(post);
    const finalPost = postResponse ? postResponse : post;

    return (`
      <nav class="home-nav">
        <div id="categories-title">Categories</div>
        <a href="" class="home-nav-link" data-link>Technology</a>
        <a href="" class="home-nav-link" data-link>Politics</a>
        <a href="" class="home-nav-link" data-link>Fashion</a>
      </nav>

      <div class="home-content">
        <h1 id="home-title">Welcome to Divulge</h1>
          <table id="all-posts-table">
          ${JSON.stringify(finalPost)}
          </table>
      <div>
    `);
  }
}
