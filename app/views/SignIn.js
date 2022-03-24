import Navbar from "../components/Navbar.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("SignIn");
    }

    async getHtml() {
        return `
        ${Navbar()}
        <div class='signin'>
        <div class='signin__container'>
            <div class='signin__left'>
                <h1>Hey!</h1>
                <p><strong>Check new articles today.</strong></p>
            </div>

            <div class='signin__right'>

                <form class='signin__form'>
                    <div class='signin__form-control'>
                        <input type="email" id="email" placeholder="Email" />
                        <small>Email is not valid</small>
                    </div>
                    <div class='signin__form-control'>
                        <input type="password" id="password" placeholder="Password" />
                        <small>Password cannot be empty</small>
                    </div>
                    <button>Sign In</button>
                </form>
            </div>
        </div>
    </div>
        `;
    }
}
