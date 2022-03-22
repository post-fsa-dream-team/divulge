import AbstractView from "./AbstractView.js";

let dummyData = [{title: "post1", imageUrl: "https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-shaking-puppy.jpg?itok=4_quJCAy", content:"This is fake content"}, {title: "post2", imageUrl: "https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-shaking-puppy.jpg?itok=4_quJCAy", content:"This is fake content"}, {title: "post3", imageUrl: "https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-shaking-puppy.jpg?itok=4_quJCAy", content:"This is fake content"}]

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("Home");
    this.state = {
      selectedPosts: "news"
    }
  }

  async getData () {
    const response = await fetch("http://localhost:3000/api/posts")
    const data = await response.json()
    return data
  }

  filterPosts(posts, category) {
    return posts.filter(post => {
      for (let key in post) {
        if (post[key] === category) {
          return post
        }
      }
    })
  }

  async getHtml() {
    let posts = await this.getData()

    if (this.state.selectedPosts !== "all") {
      posts = this.filterPosts(posts, this.state.selectedPosts)
      // return AllPostsView(posts)
    }

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
                  <td>
                  <div class="article-title">${item.title}</div>
                  <div class="author">by ${item.user_name}</div>
                  <div>${item.content.slice(0, 200).split(" ").join(" ") + "..."}</div>
                  </td>
                  <td>
                  <img class="post-image" src="${item.image_url}"/>
                  </td>
                </tr>`
              ).join('')}
            </tbody>
          </table>
        <div>`
  }

  async postRender() {}
}
