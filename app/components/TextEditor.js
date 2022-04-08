import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("TextEditor");
    }

    async getHtml() {
        return `
        <center><a href="https://www.tiny.cloud/"><img width="150" src="https://www.tiny.cloud/storage/online-html-editor/tiny-image.png"></a></center>
        `;
    }
}
