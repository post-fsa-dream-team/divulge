const SideNav = () => {
  return `
  <nav class="home-nav">
    <a href="/posts/all/all" id="all-posts-link" data-link>All Posts</a>
    <div id="categories">Posts By Category</div>
    <a href="/posts/all/news" class="home-nav-link" data-link>News</a>
    <a href="/posts/all/technology" class="home-nav-link" data-link>Technology</a>
    <a href="/posts/all/politics" class="home-nav-link" data-link>Politics</a>
    <a href="/posts/all/crime" class="home-nav-link" data-link>Crime</a>
    <a href="/posts/all/entertainment" class="home-nav-link" data-link>Entertainment</a>
    <a href="/posts/all/fashion" class="home-nav-link" data-link>Fashion</a>
    <a href="/posts/all/sports" class="home-nav-link" data-link>Sports</a>
  </nav>`
}

export default SideNav
