import Navbar from "../components/Navbar.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor () {
    super ()
  }

  async getHtml() {
    return`
      ${Navbar()}
      <div id="logout-body">
      <div id="logout-container">

      <h1 id="logout-title">Logout</h1>
      <img id="logout-image" alt="stay-image" src="https://media3.giphy.com/media/DADnfSLIFxDUc/giphy.gif" />
      <p id="main-text">Are you sure you'd like to logout?</p>
      <button id="logout-button">Yes, log me out!</button>
      <button id="back-home-button">Nah, return home.</button>
      </div>
      </div>
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
