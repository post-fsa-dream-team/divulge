class RightNav {
  constructor() {
  }

  async getUsers() {
    const port = /localhost/.test(window.location.href)
    ? "http://localhost:3000/api"
    : "https://divulge-web-app.herokuapp.com/api";
    try {
      let response = await fetch(`${port}/users/limitedusers`)
      let data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async render() {

    let allUsers = await this.getUsers()
    let users = allUsers.sort(() => .5 - Math.random()).slice(0,6)
    console.log(users)

    return (`
      <div class="right-nav-container">
      <p class="right-nav-discover-users">Discover Other Users</p>
        <div class="right-nav-main">
            ${users.map((user) => `
              <a href="" class="right-nav-main-link" data-link>${user.user_name}</a>
            `).join("")}

        </div>

        <div class="right-nav-footer">
          <a class="right-nav-footer-link" href="">About Divulge</a>
          <a class="right-nav-footer-link" href="">Contact</a>
        </div>
      </div>`)
  }

}

export default RightNav
