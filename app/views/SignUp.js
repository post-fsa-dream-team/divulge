import Navbar from "../components/Navbar.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("SignUp");
        this.createUser = this.createUser.bind(this);
        this.addErrorTo = this.addErrorTo.bind(this);
        this.removeErrorFrom = this.removeErrorFrom.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    addErrorTo(field, message) {
        const formControl = document.getElementById('signupform')[field].parentNode;
        formControl.classList.add('error');
        const small = formControl.querySelector('small');
        small.innerText = message;
        // console.log("invoke addErrorTo", field, message);
    }

    removeErrorFrom(field) {
        const formControl = document.getElementById('signupform')[field].parentNode;
        formControl.classList.remove('error');
    }

    isValid(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async createUser(user) {
        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if (!response.ok) throw new Error('Something went wrong with user create request.');
            const resData = await response.json();
            this.userResponse = resData;
            console.log('Create Successful');
            // console.log(this.userResponse);
        } catch (error) {
            console.log('!!!Create user error!!!', error);
        }
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

        <form class='signup__form' id='signupform'>
        <div class='signup__form-control'>
            <input type="text" id="firstname" placeholder="First Name"/>
            <small></small>
        </div>
        <div class='signup__form-control'>
            <input type="text" id="lastname" placeholder="Last Name"/>
            <small></small>
        </div>
        <div class='signup__form-control'>
            <input type="email" id="email" placeholder="Email"/>
            <small></small>
        </div>
        <div class='signup__form-control'>
            <input type="password" id="password" placeholder="Password"/>
            <small></small>
        </div>

        <button style="text-transform:uppercase">Sign up and claim your free trial</button>
        <small>By clicking the button, you are agreeing to our <a href="href">Terms and Services</a>.</small>
    </form>
    </div>
    </div>
    </div>
    `;
    }

    async postRender() {
        const createUser = this.createUser;
        const addErrorTo = this.addErrorTo;
        const removeErrorFrom = this.removeErrorFrom;
        const isValid = this.isValid;

        const form = document.getElementById('signupform');
        form.addEventListener('submit', e => {
            e.preventDefault();
            const firstName = form['firstname'].value;
            const lastName = form['lastname'].value;
            const email = form['email'].value;
            const password = form['password'].value;
            const user = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }

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
            } else if (!this.isValid(email)) {
                addErrorTo('email', 'Email is not valid');
            } else {
                removeErrorFrom('email');
            }

            if (password === '') {
                addErrorTo('password', 'Password is required');
            } else {
                removeErrorFrom('password');
            }
            // await createUser(user)
            // firstName = '';
            // lastName = '';
            // email = '';
            // password = '';

        })


    }
}
