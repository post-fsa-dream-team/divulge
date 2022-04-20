import Navbar from "../components/Navbar.js";
import AbstractView from "./AbstractView.js";
import SideNav from "../components/SideNav.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("EditPost");
    this.postId = params.postid;
    this.postResponse = '';
    this.editPost = this.editPost.bind(this);
  }

  async getPost() {
    try {
      const response = await fetch('http://localhost:3000/api/posts');
      if (!response.ok) throw new Error('Something wen wrong with get post request.');
      const resData = await response.json();
      this.postResponse = resData;
    } catch (error) {
      console.log('!!!Get post error!!!', error);
    }
  }

  async editPost(post) {
    const port = /localhost/.test(window.location.href)
    ? "http://localhost:3000/api"
    : "https://divulge-web-app.herokuapp.com/api";
    try {
      const { post_id, title, content, category, image_url } = post;
      const response = await fetch(`${port}/posts/${post_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, content, category, image_url})
      });
      if (!response.ok) throw new Error('Something went wrong with put edit post request.');
      // const resData = await response.json();
      // this.postResponse = resData;
      // console.log('Edit Successful');
      // console.log(this.postResponse);
    } catch (error) {
      console.log('!!!Edit post error!!!',  error);
    }
  }

  // ${SideNav()}
  async getHtml() {
    const category = ["Technology", "Politics", "Fashion", "News", "Sports", "Entertaiment", "Crime"]
    return (`
    ${Navbar()}
    <div class="edit-post-container">
    <div class="post-content">
      <input id="input-title" type="text" name="title" placeholder="Title" value="" />
      <input id="input-imageUrl" class="inputField" type="text" name="imageUrl" placeholder="Thumbnail URL" value="" />
      <div id="action">
        <select id="post-category" name="category" form="post-form">
          <option value="none" selected disabled hidden>Select a Category</option>
          ${category.map(cat => {
            return `<option value="${cat}">${cat}</option>`
          })}
        </select>
        <input id="submit-button" type="submit" value="Publish" onclick="window.location='/profile'"></input>
      </div><br />
      <div id="editor-control">
        <form >
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
        <br />
        <iframe id="output" name="textField" value=""></iframe>
    </div><br />
  </div>


    `);
  }

  async postRender() {
    const editPost = this.editPost;
    await this.getPost();
    const post = this.postResponse.find(element => element.post_id === parseInt(this.postId));
    document.getElementById('input-title').value = post.title;
    const contentObj = document.getElementById('output');
    contentObj.contentWindow.document.open();
    contentObj.contentWindow.document.write(post.content);
    contentObj.contentWindow.document.close();
    document.getElementById('post-category').value = post.category;
    document.getElementById('input-imageUrl').value = post.image_url;


    // The following executes upon hitting the submit button.
    document.getElementById("submit-button").addEventListener('click', async (e) => {
      e.preventDefault();
      const title = document.getElementById('input-title');
      const contentObj = document.getElementById('output');
      const content = contentObj.contentWindow.document.body.innerHTML;
      const category = document.getElementById('post-category');
      const image_url = document.getElementById('input-imageUrl');
      const editedPost = {
        post_id: post.post_id,
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
      await editPost(editedPost);
      // title.value = '';
      // image_url.value = '';
      // contentObj.contentWindow.document.open();
      // contentObj.contentWindow.document.write('');
      // contentObj.contentWindow.document.close();
      // category.value = 'none';
      const protocol = document.location.protocol;
      const host = document.location.host
      window.location.replace(`${protocol}//${host}/profile`);
    });

    // Text Editor Bar Code
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
      });
    }
  }
}
