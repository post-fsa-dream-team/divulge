
const Navbar = () => {

  //SOME KIND OF ADMIN AUTHORIZATION
  let admin = sessionStorage.getItem("is_admin")
  let user = sessionStorage.getItem("id")
  const userId = sessionStorage.getItem('id');


  if (admin !== true && user) {
    return `<nav class="nav-bar">
    <div class="title-container">
      <div id="site-title">
        <p><a href="/home" data-link>Divulge</a></p>
      </div>
    </div>

    <a href="#" class="hamburger-menu">
      <input type="checkbox"/>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    </a>

    <div class="nav-links">
      <ul class="nav-items">
        <li><a href="/home" class="nav-link" data-link>Home</a></li>
        <li><a href="/profile" class="nav-link" data-link>Profile</a></li>
        <li><a href="/${userId}/createpost" class="nav-link" data-link>Create Post</a></li>
        <li><a href="/logout" class="nav-link" data-link>Logout</a></li>
      </ul>
    </div>
  </nav>
  `
  } else if (admin && user) {
    return `<nav class="nav-bar">
    <div class="title-container">
      <div id="site-title">
        <p><a href="/home">Divulge</a></p>
      </div>
    </div>

    <a href="#" class="hamburger-menu">
      <span class="bar"><a href="/adminportal" id="admin-portal-link" class="nav-link" data-link>Admin Portal</a></span>
      <span class="bar"><a href="/home" class="nav-link" data-link>Home</a></span>
      <span class="bar"><a href="/profile" class="nav-link" data-link>Profile</a></span>
      <span class="bar"><a href="/${userId}/createpost" class="nav-lnpmink" data-link>Create Post</a></span>
    </a>

    <div class="nav-links">
      <ul class="nav-items">
        <li><a href="/adminportal" id="admin-portal-link" class="nav-link" data-link>Admin Portal</a></li>
        <li><a href="/home" class="nav-link" data-link>Home</a></li>
        <li><a href="/profile" class="nav-link" data-link>Profile</a></li>
        <li><a href="/${userId}/createpost" class="nav-link" data-link>Create Post</a></li>
        <li><a href="/logout" class="nav-link" data-link>Logout</a></li>
      </ul>
    </div>
  </nav>
  `
  }
  else {
    return `<nav class="nav-bar" id="nav-bar-signed-out">
    <div class="title-container">
      <div id="site-title">
        <p><a href="/" data-link>Divulge</a></p>
      </div>
    </div>

    <a href="#" class="hamburger-menu">
      <input type="checkbox"/>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    </a>

    <div class="nav-links">
      <ul class="nav-items">
        <li><a href="/signup" class="nav-link" data-link>Sign Up</a></li>
        <li><a href="/signin" class="nav-link" data-link>Sign In</a></li>
      </ul>
    </div>
  </nav>
  `
}

}

export default Navbar;
