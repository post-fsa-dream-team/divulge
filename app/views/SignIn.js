import Navbar from "../components/Navbar.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("SignIn");
    }

    async signIn(data) {
        try {
            let response = await fetch("http://localhost:3000/auth/signin", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log(response)
          } catch (error) {
            console.log(error)
          }
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
                        <input type="email" id="email" placeholder="Email" value="" />
                        <small>Email is not valid</small>
                    </div>
                    <div class='signin__form-control'>
                        <input type="password" id="password" placeholder="Password" value="" />
                        <small>Password cannot be empty</small>
                    </div>
                    <button id="sign-in-button">Sign In</button>
                </form>
            </div>
        </div>
    </div>
        `;
    }

    async postRender() {
        let submitButton = document.getElementById("sign-in-button")
        submitButton.addEventListener("click", async (e) => {
            e.preventDefault()
            const email = document.getElementById("email").value
            // const email = emailObj.contentWindow.document.body.innerHTML;
            const password = document.getElementById("password").value
            // const password = passwordObj.contentWindow.document.body.innerHTML;
            const signInData = {
                email: email,
                password: password
            }

            console.log(signInData)
           await this.signIn(signInData)
        })
    }
}
