import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("SignUp");
    }

    async getHtml() {
        return `
            <h1>This is a Sign Up page</h1>

        `;
    }
}
