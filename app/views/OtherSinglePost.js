import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("OtherSinglePost");
    this.postId = params.id;
  }

  // async getData () {
  //   const response = await fetch(`http://localhost:3000/api/posts/${this.postId}`)
  //   const data = await response.json()
  //   return data
  // }

  async getHtml() {
    console.log("OtherSinglePost")
    return `
      <div class='body-content'>
      <h1>TITLE OF ARTICLE</h1>
      <img class="single-post-img" src="https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHVwcHl8ZW58MHx8MHx8&w=1000&q=80"/>
      <p>This is the body content</p>

      </div>
    `
  }
}
