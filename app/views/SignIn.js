import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("SignIn");
    }

    async getHtml() {
        return `
        <div class='signin'>

        <div class='signin__left'>
            <h1>Hey!</h1>
        </div>

        <div class='signin__right'>
            <div class='signin__box box-blue'>
                <p><strong>Check new articles today.</strong></p>
            </div>
        </div>

        <form class='signin__form'>
        <div class='signin__form-control'>
            <input type="email" id="email" placeholder="Email"/>
            <small>Email is not valid</small>
        </div>
        <div class='signin__form-control'>
            <input type="password" id="password" placeholder="Password"/>
            <small>Password cannot be empty</small>
        </div>
    </form>
    </div>

        `;
    }
}
