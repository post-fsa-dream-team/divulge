import AbstractView from "./AbstractView.js";
import AllPostNavigation from "./AllPostNavigation.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("Home");
  }

 async loadTableData (url, table) {
    const tableBody = table.querySelector("tbody")
    const response = await fetch(url)
    const { rows } = await response.json()

    //clear the table
    tableBody.innerHTML = "<tr></tr>"

    //populate the rows
    for (const rowText of rows) {
      const rowElement = document.createElement("tr")

      rowElement.textConent = rowText;
      tableBody.querySelector("tr").appendChild(rowElement)
    }
  }

  async getHtml() {


    let myPosts = [{title: "post1", imageUrl: "https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-shaking-puppy.jpg?itok=4_quJCAy", content:"This is fake content"}, {title: "post2", imageUrl: "https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-shaking-puppy.jpg?itok=4_quJCAy", content:"This is fake content"}, {title: "post3", imageUrl: "https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-shaking-puppy.jpg?itok=4_quJCAy", content:"This is fake content"}]

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
            ${this.loadTableData("/api/posts", document.querySelector("table"))}
            </tbody>
          </table>
        <div>`
  }
}
