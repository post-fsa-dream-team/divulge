
const PostsView = (posts, capitalCase, userid) => {

  let isUserId = !!userid

  return `
    <div id="posts-content">
    ${isUserId === true ? `<p class="other-posts-page-title">Other User Posts</p>`: ` <p class="other-posts-page-title">${capitalCase} Posts</p>`}

      <div class="no-posts">
      ${isUserId === true ? `<div class="no-posts-title">There are no posts from this user yet!</div>`: `<div class="no-posts-title">There are no ${capitalCase} posts yet!</div>`}

      <button> <a href="/posts/all/all" data-link> Return To All Posts </a> </button>
    </div>
    </div>
  `
}

export default PostsView
