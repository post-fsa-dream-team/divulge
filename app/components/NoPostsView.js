
const PostsView = (posts, capitalCase) => {

  return `
    <div id="posts-content">
      <p class="other-posts-page-title">${capitalCase} Posts<p>
      <div class="no-posts">
      <div class="no-posts-title">There are no ${capitalCase} posts yet!</div>
      <button> <a href="/posts/all/all" data-link> Return To All Posts </a> </button>
    </div>
    </div>
  `
}

export default PostsView
