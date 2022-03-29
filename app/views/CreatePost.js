import Navbar from "../components/Navbar.js";
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
        ${Navbar()}
        ${SideNav()}
        <div id="post-content">
          <h1 id="createPost-title">Create Your Content</h1>
          <div>
            <div>
              <input id="input-title" class="inputField" type="text" name="title" placeholder="Title" value="" />
            </div><br />
            <div>
              <input id="input-imageUrl" class="inputField" type="text" name="imageUrl" placeholder="Thumbnail URL" value="" />
            </div><br />
            <div>
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
            </div>
            <div>
              <iframe id="output" name="textField" value=""></iframe>
            </div>
            <br />
            <div>
              <select id="post-category" name="category" form="post-form">
                <option value="none" selected disabled hidden>Select a Category</option>
                <option value="technology">Technology</option>
                <option value="politics">Politics</option>
                <option value="fashion">Fashion</option>
                <option value="news">News</option>
                <option value="sports">Sports</option>
                <option value="entertainment">Entertainment</option>
                <option value="crime">Crime</option>
              </select>
            </div><br />
            <input id="submit-button" type="submit" value="Submit Post"></input>
          </div><br />
        </div>
      </div>

    `);
  }

  async postRender() {
    const createPost = this.createPost;
    document.getElementById("submit-button").addEventListener('click', async (e) => {
      e.preventDefault();
      const title = document.getElementById('input-title');
      const contentObj = document.getElementById('output');
      const content = contentObj.contentWindow.document.body.innerHTML;
      const category = document.getElementById('post-category');
      const image_url = document.getElementById('input-imageUrl');
      const post = {
        title: title.value,
        content: content,
        category: category.value,
        image_url: image_url.value,
        user_id: this.params.userId
      }
      if (category.value === "none") {
        alert('Please fill in category');
        category.focus();
        return;
      }
      await createPost(post);
      title.value = '';
      image_url.value = '';
      contentObj.contentWindow.document.open();
      contentObj.contentWindow.document.write('');
      contentObj.contentWindow.document.close();
      category.value = 'none';
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
