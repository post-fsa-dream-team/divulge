
const PostsView = (posts) => {
  return `
    <div id="posts-content">
    <div id="cards-container">

        ${posts.map((item) =>
        `<a class="article-link" href="/posts/${item.id}"><div class="post-card">
          <div class="article-title">${item.title}</div>
          <div class="author">by ${item.user_name}</div>
          <div class="card-container">
            <img class="post-image" src="${item.image_url}"/>
              <div>
                <div>${item.content.slice(0, 200).split(" ").join(" ") + "..."}</div>
              </div>
            </div>
          </div></a>`
        ).join('')}
    </div>
    </div>
  `
}

export default PostsView
