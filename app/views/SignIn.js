import Navbar from "../components/Navbar.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("SignIn");
    }

    async getHtml() {
        return `
        ${Navbar}
        <div class='signin'>
        <div class='signin__container'>
            <div class='signin__left'>
                <h1>Hey!</h1>
                <p><strong>Check new articles today.</strong></p>
            </div>

            <div class='signin__right'>

                <form class='signin__form' id='signin__form'>
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
    async postRender() {
        const form = document.getElementById('signin__form');

        form.addEventListener('submit', e => {
            e.preventDefault();

            const firstName = form['firstname'].value;
            const lastName = form['lastname'].value;
            const email = form['email'].value;
            const password = form['password'].value;

            if (firstName === '') {
                addErrorTo('firstname', 'First Name is required');
            } else {
                removeErrorFrom('firstname');
            }

            if (lastName === '') {
                addErrorTo('lastname', 'Last Name is required');
            } else {
                removeErrorFrom('lastname');
            }

            if (email === '') {
                addErrorTo('email', 'Email is required');
            } else if (!isValid(email)) {
                addErrorTo('email', 'Email is not valid');
            } else {
                removeErrorFrom('email');
            }

            if (password === '') {
                addErrorTo('password', 'Password is required');
            } else {
                removeErrorFrom('password');
            }
        });

        function addErrorTo(field, message) {
            const formControl = form[field].parentNode;
            formControl.classList.add('error');

            const small = formControl.querySelector('small');
            small.innerText = message;
        }

        function removeErrorFrom(field) {
            const formControl = form[field].parentNode;
            formControl.classList.remove('error');
        }

        function isValid(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    }
}
