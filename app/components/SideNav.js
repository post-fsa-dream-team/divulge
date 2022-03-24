const SideNav = () => {
  return `
  <nav class="home-nav">
    <a href="/posts/${"all"}" id="all-posts-link" data-link>All Posts</a>
    <div id="categories">By Category</div>
    <a href="/posts/${"news"}" class="home-nav-link" data-link>News</a>
    <a href"/posts/${"crime"}" class="home-nav-link" data-link>Crime</a>
    <a href="/posts/${"technology"}" class="home-nav-link" data-link>Technology</a>
    <a href="/posts/${"entertainment"}" class="home-nav-link" data-link>Entertainment</a>
    <a href="/posts/${"sports"}" class="home-nav-link" data-link>Sports</a>
  </nav>`
}

export default SideNav
