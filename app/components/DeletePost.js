class DeletePost {
  constructor(id) {
    this.postId = id;
  }

  async deletePost(postId) {
    const port = /localhost/.test(window.location.href)
    ? "http://localhost:3000/api"
    : "https://divulge-web-app.herokuapp.com/api";
    try {
      await fetch(`${port}/posts/${postId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.log('!!!Delete post error!!!',  error);
    }
  }

  render() {
    return (`<button id="delete-button" class="edit-delete" type="button">Delete</button>`);
  }

  async script() {
    const deletePost = this.deletePost;
    const postId = this.postId;
    document.getElementById("delete-button").addEventListener('click', async (e) => {
      console.log(postId);
      await deletePost(postId);
      const protocol = document.location.protocol;
      const host = document.location.host
      window.location.replace(`${protocol}//${host}/profile`);
    });
  }
}

export default DeletePost;
