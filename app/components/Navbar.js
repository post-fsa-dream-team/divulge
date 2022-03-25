const Navbar = () => {

  //SOME KIND OF ADMIN AUTHORIZATION
  let admin = sessionStorage.getItem("admin")

  !admin ? `<nav class="nav-bar">
  <div class="title-container">
    <div id="site-title">
      <p><a href="/home">Divulge</a></p>
    </div>
  </div>

  <a href="#" class="toggle-button">
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
  </a>

  <div class="nav-links">
    <ul class="nav-items">
      <li><a href="/home" class="nav-link" data-link>Home</a></li>
      <li><a href="/profile" class="nav-link" data-link>Profile</a></li>
      <li><a href="/createpost" class="nav-lnpmink" data-link>Create Post</a></li>
      <li><a href="/signin" class="nav-link" data-link>Sign In</a></li>
      <li><a href="/signup" class="nav-link" data-link>Sign Up</a></li>
    </ul>
  </div>
</nav>
`
:

`<nav class="nav-bar">
  <div class="title-container">
    <div id="site-title">
      <p><a href="/home">Divulge</a></p>
    </div>
  </div>

  <a href="#" class="toggle-button">
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
  </a>

  <div class="nav-links">
    <ul class="nav-items">
      <li><a href="/adminportal" id="admin-portal-link" class="nav-link" data-link>Admin Portal</a></li>
      <li><a href="/home" class="nav-link" data-link>Home</a></li>
      <li><a href="/profile" class="nav-link" data-link>Profile</a></li>
      <li><a href="/createpost" class="nav-lnpmink" data-link>Create Post</a></li>
      <li><a href="/signin" class="nav-link" data-link>Sign In</a></li>
      <li><a href="/signup" class="nav-link" data-link>Sign Up</a></li>
    </ul>
  </div>
</nav>
`

}

export default Navbar;
