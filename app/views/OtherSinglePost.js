import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle("OtherSinglePost");
    this.postId = params.id;
  }

  // async getData () {
  //   const response = await fetch(`http://localhost:3000/api/posts/${id}`)
  //   const data = await response.json()
  //   return data
  // }

  async getHtml() {
    console.log("OtherSinglePost")
    return `
      <div>Hello world</div>
    `
  }
}
