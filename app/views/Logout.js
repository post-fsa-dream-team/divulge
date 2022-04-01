import Navbar from "../components/Navbar.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor () {
    super ()
  }

  async getHtml() {
    return`
      ${Navbar()}
      <h1>Logout<h1>
      <p>Are you sure you'd like to logout?</p>
      <button id="logout-button">Yes, log me out!</button>
      <button id="back-home-button">Nah, return home.</button>
      `
  }

  async postRender() {
    document.getElementById("logout-button").addEventListener("click", async (e) => {
      e.preventDefault()
      sessionStorage.clear()
      window.location.replace("/")
    })

    document.getElementById("back-home-button").addEventListener("click", async (e) => {
      e.preventDefault()
      window.location.replace("/home")
    })
  }
}
