//All view classes will inherit this constructor


export default class {
  constructor(params) {
      this.params = params;
  }

  setTitle(title) {
      document.title = title;
  }

  async getHtml() {
      return "";
  }
}
