
const Navbar = () => {

  //SOME KIND OF ADMIN AUTHORIZATION
  let admin = sessionStorage.getItem("is_admin")
  let user = sessionStorage.getItem("id")
  console.log("this is navbar")


  if (!admin && user) {
    return `<nav class="nav-bar">
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
        <li><a href="/logout" class="nav-link">Logout</a></li>
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
        <li><a href="/createpost" class="nav-link" data-link>Create Post</a></li>
        <li><a href="/logout" class="nav-link">Logout</a></li>
      </ul>
    </div>
  </nav>
  `
  }
  else {
    return `<nav class="nav-bar">
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
        <li><a href="/signup" class="nav-link">Signup</a></li>
        <li><a href="/signin" class="nav-link">Sign in</a></li>
      </ul>
    </div>
  </nav>
  `
}

}

export default Navbar;
