const AllPostsView = (posts) => {
  return ` <nav class="home-nav">
<div id="categories-title">Categories</div>
<a href="" class="home-nav-link" data-link>Technology</a>
<a href="" class="home-nav-link" data-link>Politics</a>
<a href="" class="home-nav-link" data-link>Fashion</a>
</nav>

<div class="home-content">
<h1 id="home-title">Welcome to Divulge</h1>
  <table id="all-posts-table">
    <tbody>
      ${posts.map((item) =>
        `<tr>
          <td>
          <div class="article-title">${item.title}</div>
          <div class="author">by ${item.user_name}</div>
          <div>${item.content.slice(0, 200).split(" ").join(" ") + "..."}</div>
          </td>
          <td>
          <img class="post-image" src="${item.image_url}"/>
          </td>
        </tr>`
      ).join('')}
    </tbody>
  </table>
<div>`}

export default AllPostsView
