
const PostsView = (posts, capitalCase) => {

  return `
    <div id="posts-content">
      <div class="no-posts">
      <div>There are no ${capitalCase} posts yet!</div>
      <button> <a href="/posts/all/all" data-link> Return To All Posts </a> </button>
    </div>
    </div>
    <hr>
  `
}

export default PostsView
