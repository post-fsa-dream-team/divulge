import AbstractView from "./AbstractView.js";

let dummyData = [{title: "post1", imageUrl: "https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-shaking-puppy.jpg?itok=4_quJCAy", content:"This is fake content"}, {title: "post2", imageUrl: "https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-shaking-puppy.jpg?itok=4_quJCAy", content:"This is fake content"}, {title: "post3", imageUrl: "https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-shaking-puppy.jpg?itok=4_quJCAy", content:"This is fake content"}]

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("Home");
  }

  async getData () {
    const response = await fetch("/api/posts")
    const data = await response.json()
    return data
  }

  async getHtml() {
    let posts = await this.getData()

    return `
      <nav class="home-nav">
        <div id="categories-title">Categories</div>
        <a href="" class="home-nav-link" data-link>Technology</a>
        <a href="" class="home-nav-link" data-link>Politics</a>
        <a href="" class="home-nav-link" data-link>Fashion</a>
      </nav>

      <div class="home-content">
        <h1 id="home-title">Welcome to Divulge</h1>
          <table id="all-posts-table">
            <tbody>
              ${posts.map((item) =>
                `<tr>
                  <td><img class="post-image" src="${item.image_url}"/></td>
                  <td>${item.title}</td>
                  <td>${item.content}</td>
                </tr>`
              ).join('')}
            </tbody>
          </table>
        <div>`
  }
}
