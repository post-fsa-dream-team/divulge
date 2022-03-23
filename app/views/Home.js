import AbstractView from "./AbstractView.js";
import PostsView from "./HomeView/PostsView.js"

let dummyData = [{title: "post1", imageUrl: "https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-shaking-puppy.jpg?itok=4_quJCAy", content:"This is fake content"}, {title: "post2", imageUrl: "https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-shaking-puppy.jpg?itok=4_quJCAy", content:"This is fake content"}, {title: "post3", imageUrl: "https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-shaking-puppy.jpg?itok=4_quJCAy", content:"This is fake content"}]

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("Home");
    this.state = {
      selectedCategory: "all posts"
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
    console.log(this.state)
    let posts = await this.getData()
    if (this.state.selectedCategory !== "all posts") {
      posts = this.filterPosts(posts, this.state.selectedCategory)
    }
    return PostsView(posts)
  }

  async postRender() {
    let elements = document.getElementsByClassName("home-nav-link")

    const changeSelection = (e) => {
      console.log(elements)
      console.log(this.state)
      console.log(`clicked on ${e}`)
      this.state.selectedCategory = e.target.text.toLowerCase()
      this.getHtml()
    }

    for (let i = 0; i < elements.length; i++){
      elements[i].addEventListener("click", async function(e) {
        e.preventDefault();
        changeSelection(e)
      }
    )
    }
  }
}
