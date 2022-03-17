import AbstractView from "./AbstractView.js";
import AllPostNavigation from "./AllPostNavigation.js";



export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("Home");
  }

  async getHtml() {
    // let getPosts = async () => {
    //   const options = {
    //      method: 'GET',
    //      headers: {
    //          'Content-Type': 'application/json'
    //      }
    //  };
    //  try {
    //      const response = await fetch("/posts")
    //      const json = await response.json();
    //      // console.log(json)
    //      return json
    //  } catch (err) {
    //      console.log('Error getting documents', err)
    //  }
    // }

    let myPosts = [{title: "post1", imageUrl: " https://cf.ltkcdn.net/dogs/images/orig/235430-2000x1332-australian-shepherd-puppy.jpg", content:"This is fake content"}, {title: "post2", imageUrl: "https://cf.ltkcdn.net/dogs/images/orig/235430-2000x1332-australian-shepherd-puppy.jpg", content:"This is fake content"}, {title: "post3", imageUrl: "https://cf.ltkcdn.net/dogs/images/orig/235430-2000x1332-australian-shepherd-puppy.jpg", content:"This is fake content"}]

    return `
      <h1 id="home-title">Welcome to Divulge</h1>
        <table id="all-posts-table">
            ${myPosts.map(post =>
              `<tr>
                <td class="image-cell"><img src=${post.imageUrl}/></td>
                <td>${post.title}</td>
                <td>${post.content}</td>
              </tr>`
                ).join('')}
        </table>
      `
  }
}
