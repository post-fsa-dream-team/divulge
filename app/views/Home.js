import AbstractView from "./AbstractView.js";
import AllPostNavigation from "./AllPostNavigation.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("Home");
  }

  async getHtml() {
    return `<h1 id="home-title">Welcome to Divulge</h1>`
  }
}
