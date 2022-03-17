import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("SignIn");
    }

    async getHtml() {
        return `
            <h1>This is a Sign In page</h1>

        `;
    }
}
