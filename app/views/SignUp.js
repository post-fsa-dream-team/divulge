import Navbar from "../components/Navbar.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("SignUp");
    }

    async getHtml() {
        return `
        ${Navbar}
        <div class='signup'>
        <div class='signup__container'>
            <div class='signup__left'>
                <h1>Read the most exclusive information from others</h1>
                <p>See how people solve problems in real-life. </p>
            </div>
        <div class="signup__right">
            <div class='signup__box-blue'>
                <p> <strong>Try it free 7 days</strong> then $20/mo. thereafter </p>
            </div>

        <form class='signup__form' id='signup__form'>
        <div class='signup__form-control'>
            <input type="text" id="firstname" placeholder="First Name"/>
            <small>First Name cannot be empty</small>
        </div>
        <div class='signup__form-control'>
            <input type="text" id="lastname" placeholder="Last Name"/>
            <small>Last Name cannot be empty</small>
        </div>
        <div class='signup__form-control'>
            <input type="email" id="email" placeholder="Email"/>
            <small>Email is not valid</small>
        </div>
        <div class='signup__form-control'>
            <input type="password" id="password" placeholder="Password"/>
            <small>Password cannot be empty</small>
        </div>

        <button style="text-transform:uppercase" >Sign up and claim your free trial</button>
        <small>By clicking the button, you are agreeing to our <a href="href">Terms and Services</a>.</small>
    </form>
    </div>
    </div>
    </div>
    `;
    }

    async postRender() {
        const form = document.getElementById('signup__form');

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
