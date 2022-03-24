
const PostsView = (posts) => {
  function convertDate(date) {
    console.log(date.split(''))
    let splitIndex = date.split("").indexOf("T")
    console.log(splitIndex+1)
    let dayOnly = date.slice(0, splitIndex)
    console.log(dayOnly)
    return new Date(dayOnly)
  }

  return `
    <div id="posts-content">
      <div class="post-card">
        ${posts.map((item) =>
        `
        <div class="each-box">
        <a class="article-link" href="/posts/${item.id}">
        <div id="cards-container">
          <div class="authorAndCreated">
            <span class="article-date">${convertDate(item.created_at)}</span><span class="author">by ${item.user_name}</span>
            <div class="article-title">${item.title}</div>
          </div>
          <img class="post-image" src="${item.image_url}"/>
          <div class="article-content">${item.content.slice(0, 200).split(" ").join(" ") + "..."}</div>
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
