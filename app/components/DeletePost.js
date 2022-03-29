class DeletePost {
  constructor(id) {
    this.postId = id;
  }

  async deletePost(postId) {
    try {
      await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.log('!!!Delete post error!!!',  error);
    }
  }

  render() {
    return (`
      <button id="delete-button" type="button">Delete</button>
    `);
  }

  async script() {
    const deletePost = this.deletePost;
    const postId = this.postId;
    document.getElementById("delete-button").addEventListener('click', async (e) => {
      console.log(postId);
      await deletePost(postId);
      const protocol = document.location.protocol;
      const host = document.location.host
      window.location.replace(`${protocol}//${host}/home`);
    });
  }
}

export default DeletePost;
