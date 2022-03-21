//All view classes will inherit this constructor
export default class {
    constructor(params) {
        this.params = params;
    }

    //takes in a title, e.g. "profile" and sets the title to the input
    setTitle(title) {
        document.title = title;
    }

    //initializes the HTML view; extensions of this class will provide their own HTML for the selected view
    async getHtml() {
        return "";
    }
  }
