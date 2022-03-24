
const PostsView = (posts) => {
  function convertDate(date) {
    let splitIndex = date.split("").indexOf("T")
    let dayOnly = date.slice(0, splitIndex)
    let justDate = new Date(dayOnly).toString()
    return justDate.split(" ").slice(1, 4).join(" ")
  }

  function getMinRead(content) {
    return Math.ceil(content.length / 500)
  }

  return `
    <div id="posts-content">
      <div class="post-card">
        ${posts.map((item) =>
        `
        <div class="each-box">
        <a class="article-link" href="/posts/${item.post_id}">
        <div id="cards-container">

          <div class="author-and-created">
            <span class="author"> ${item.user_name}</span>
            <span class="article-date"> • ${convertDate(item.created_at)}</span>
          </div>

          <div class="article-title">${item.title}</div>
          <img class="post-image" src="${item.image_url}"/>
          <div class="article-content">${item.content.slice(0, 200).split(" ").join(" ") + "..."}</div>

          <div class="article-category">
            <span class="category-border">${item.category}</span>
          </div>

          <div class="article-min-read">
            <span class="read-min">${getMinRead(item.content)} Min Read</span>
          </div>

          </div>
          </a>
        </div>`

        ).join('')}
      </div>

    </div>
    <hr>
  `
}

export default PostsView
