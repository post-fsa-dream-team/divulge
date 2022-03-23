import AbstractView from "./AbstractView.js";

// const dummyData = {
//   title: "The Title of this Article",
//   image_url: "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHVwcHl8ZW58MHx8MHx8&w=1000&q=80",
//   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   category: "news",
//   user_id: 5,
//   user_name: "cookie_monster",
//   first_name: "Cookie",
//   last_name: "Monster"
// }

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("OtherSinglePost");
    this.postId = params.id;
  }

  async getData (id) {
    const response = await fetch(`http://localhost:3000/api/posts/${id}`)
    const data = await response.json()
    return data
  }

  async getHtml() {
    const postArr = await this.getData(this.postId)
    let post = postArr[0]
    return `
      <div class='body-content'>
      <h1 class="single-other-post-title">${post.title}</h1>
      <h4>By: ${post.user_name}<h4>
      <img class="single-post-img" src="${post.image_url}"/>
      <p>${post.content}</p>
      </div>
    `
  }
}
