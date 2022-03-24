import AbstractView from "./AbstractView.js";
import SideNav from "../components/SideNav.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("CreatePost");
    this.postResponse = 'test';
    this.createPost = this.createPost.bind(this);
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
      if (!response.ok) throw new Error('Something went wrong with post create request.');
      const resData = await response.json();
      this.postResponse = resData;
      console.log('Create Successful');
      // console.log(this.postResponse);
    } catch (error) {
      console.log('!!!Create post error!!!',  error);
    }
  }

  async getHtml() {

    return (`
      <div id="create-post-container">
        ${SideNav}
        <div id="post-content">
          <h1 id="createPost-title">Create Your Content</h1>
          <form id="post-form">
            <div>
              <!--<label id="label-title">Title: </label>-->
              <input id="input-title" class="inputField" type="text" name="title" placeholder="Title" value="" />
            </div><br />
            <div>
              <!--<label id="label-imageUrl">Title Image URL: </label>-->
              <input id="input-imageUrl" class="inputField" type="text" name="imageUrl" placeholder="Thumbnail URL" value="" />
            </div><br />
            <form id="text-editor-form">
              <button type="button" data-cmd="justifyLeft">
                <i class="fa fa-align-left" aria-hidden="true"></i>
              </button>
              <button type="button" data-cmd="justifyCenter">
                <i class="fa fa-align-center" aria-hidden="true"></i>
              </button>
              <button type="button" data-cmd="justifyFull">
                <i class="fa fa-align-justify" aria-hidden="true"></i>
              </button>
              <button type="button" data-cmd="justifyRight">
                <i class="fa fa-align-right" aria-hidden="true"></i>
              </button>
              <button type="button" data-cmd="bold">
                <i class="fa fa-bold" aria-hidden="true"></i>
              </button>
              <button type="button" data-cmd="italic">
                <i class="fa fa-italic" aria-hidden="true"></i>
              </button>
              <button type="button" data-cmd="underline">
                <i class="fa fa-underline" aria-hidden="true"></i>
              </button>
              <button type="button" data-cmd="textHeight">
                <i class="fa fa-text-height" aria-hidden="true"></i>
              </button>
              <button type="button" data-cmd="insertOrderedList">
                <i class="fa fa-list-ol" aria-hidden="true"></i>
              </button>
              <button type="button" data-cmd="insertUnorderedList">
                <i class="fa fa-list-ul" aria-hidden="true"></i>
              </button>
              <button type="button" data-cmd="insertImage">
                <i class="fa fa-file-image-o" aria-hidden="true"></i>
              </button>
              <button type="button" data-cmd="createLink">
                <i class="fa fa-link" aria-hidden="true"></i>
              </button>
              <button type="button" data-cmd="showCode" name="active">
                <i class="fa fa-code" aria-hidden="true"></i>
              </button>
            </form>
            <div>
              <iframe id="output" name="textField" value=""></iframe>
            </div>
            <br />
            <div>
              <!--<label id="label-category">Category: </label>-->
              <select id="post-category" name="category">
                <option value="none" selected disabled hidden>Select a Category</option>
                <option value="technology">Technology</option>
                <option value="politics">Politics</option>
                <option value="fashion">Fashion</option>
                <option value="news">News</option>
                <option value="sports">Sports</option>
              </select>
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>

    `);
  }

  async postRender() {
    const createPost = this.createPost;
    document.getElementById("post-form").addEventListener("submit", async function(e) {
      e.preventDefault();
      const title = document.getElementById('input-title');
      console.log(title);
      const content = document.getElementById('output');
      const category = document.getElementById('post-category');
      const image_url = document.getElementById('input-imageURL');
      const post = {
        title: title.value,
        content: content.value,
        category: category.value,
        image_url: image_url.value,
        user_id: 2
      }
      if (category.value.trim() === "") {
        alert('Please fill in category');
        category.focus();
        return;
      }
      console.log(post);
      // createPost(post);
    });

    const buttons = document.querySelectorAll('button');
    textField.document.designMode = 'On';

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', () => {
        let cmd = buttons[i].getAttribute('data-cmd');
        if (buttons[i].name === 'active') buttons[i].classList.toggle('active');
        if (cmd === 'insertImage' || cmd === 'createLink') {
          let url = prompt('Enter Link here: ', '');
          textField.document.execCommand(cmd, false, url);
        } else {
          textField.document.execCommand(cmd, false, null);
        }
      })
    }
  }
}
