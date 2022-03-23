import AbstractView from "./AbstractView.js";
import PostsView from "../components/PostsView.js";
import SideNav from "../components/SideNav.js"

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Home");
    this.state = {
      selectedCategory: "all posts",
    };
  }

  async getData() {
    const response = await fetch("http://localhost:3000/api/posts");
    const data = await response.json();
    return data;
  }

  async getHtml() {
    console.log(this.state);
    let posts = await this.getData();
    if (this.state.selectedCategory !== "all posts") {
      posts = this.filterPosts(posts, this.state.selectedCategory);
    }
    return `
    ${SideNav()}

  <div id="home-content">
    <div class="container">
    <div>
      <div class="text-typing">
        <p>Welcome to Divulge</p>
      </div>
      <hr id="title-line"></hr>
      </div>
    </div>
      <div id="cards-container">

        ${PostsView(posts)}

      </div>
    </div>`;
  }

  async postRender() {
    // let elements = document.getElementsByClassName("home-nav-link")
    // const changeSelection = (e) => {
    //   console.log(elements)
    //   console.log(this.state)
    //   console.log(`clicked on ${e}`)
    //   this.state.selectedCategory = e.target.text.toLowerCase()
    //   this.getHtml()
    // }
    // for (let i = 0; i < elements.length; i++){
    //   elements[i].addEventListener("click", async function(e) {
    //     e.preventDefault();
    //     changeSelection(e)
    //   }
    // )
    // }
  }
}

{/* <div id="cards-container">
  $
  {posts
    .map(
      (item) =>
        `<a class="article-link" href="/posts/${
          item.id
        }"><div class="post-card">
            <div class="article-title">${item.title}</div>
            <div class="author">by ${item.user_name}</div>
            <div class="card-container">
              <img class="post-image" src="${item.image_url}"/>
                <div>
                  <div>${
                    item.content.slice(0, 200).split(" ").join(" ") + "..."
                  }</div>
                </div>
              </div>
            </div></a>`
    )
    .join("")}
</div>; */}
