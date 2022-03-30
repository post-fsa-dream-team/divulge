import Navbar from "../components/Navbar.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("SignIn");
        this.addErrorTo = this.addErrorTo.bind(this);
        this.removeErrorFrom = this.removeErrorFrom.bind(this);
        this.isValid = this.isValid.bind(this);
    }
    addErrorTo(field, message) {
        const formControl = document.getElementById('signinform')[field].parentNode;
        formControl.classList.add('error');
        const small = formControl.querySelector('small');
        small.innerText = message;
        // console.log("invoke addErrorTo", field, message);
    }

    removeErrorFrom(field) {
        const formControl = document.getElementById('signinform')[field].parentNode;
        formControl.classList.remove('error');
    }

    isValid(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    async signIn(email, password) {
        // console.log(email, password);
        try {
            let response = await fetch("http://localhost:3000/auth/signin", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "email": email, "password": password })
            });
            // console.log("response", response);
            // const body = await response.json()
            // console.log(window.sessionStorage)
            // if (response.status === 200) sessionStorage.setItem("auth", 1)
            // window.location.replace("/home")
            if (response.status === 200) {
                console.log("Sign In successfully")
            } else {
                console.log("We have an error logging in");
            };
            return response.json(response).then(data => console.log(data))
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

                <form class='signin__form' id='signinform'>
                    <div class='signin__form-control'>
                        <input type="email" id="email" placeholder="Email" value="" />
                        <small></small>
                    </div>
                    <div class='signin__form-control'>
                        <input type="password" id="password" placeholder="Password" value="" />
                        <small></small>
                    </div>
                    <button id="sign-in-button">Sign In</button>
                </form>
            </div>
        </div>
    </div>
        `;
    }
    async postRender() {
        const form = document.getElementById('signinform');
        const button = document.getElementById("sign-in-button");
        form.addEventListener('submit', e => {
            e.preventDefault();

            const email = form['email'].value;
            const password = form['password'].value;
            /**Frontend checking */
            if (email === '') {
                this.addErrorTo('email', 'Email is required');
            } else if (!this.isValid(email)) {
                this.addErrorTo('email', 'Email is not valid');
            } else {
                this.removeErrorFrom('email');
            }

            if (password === '') {
                this.addErrorTo('password', 'Password is required');
            } else {
                this.removeErrorFrom('password');
            }

            if (email && password) {
                const signIn = this.signIn(email, password)

            }
        });

    }
}
