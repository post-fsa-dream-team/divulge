import Navbar from "../components/Navbar.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("SignUp");
        this.signUp = this.signUp.bind(this);
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

    async signUp(firstName, lastName, username, email, password) {
        try {
            // console.log(firstName, lastName, username, email, password);
            const port = /localhost/.test(window.location.href)
            ? "http://localhost:3000/auth"
            : "https://divulge-web-app.herokuapp.com/auth";
            const response = await fetch(`${port}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "first_name": firstName, "last_name": lastName, "user_name": username, "email": email, "password": password })
            });
            console.log("response: ", response);
            if (response.status === 200) {
                console.log("Sign Up successfully")
            } else {
                console.log("We have an error signing up");
            }
            return response.json(response).then(data => {
                //sessionStorage.setItem(arg1, arg2) allows you to save user's information into sessionStorage https://www.section.io/engineering-education/how-and-when-to-apply-session-storage-with-javascript/
                for (let i in data) {
                    window.sessionStorage.setItem(`${i}`, `${data[i]}`);
                    window.location.replace("/home")
                }
            })
        } catch (error) {
            console.log('!!!Create user error!!!', error);
        }
    }
    async getHtml() {
        let loggedIn = !!sessionStorage.getItem("id")

        if (loggedIn) {
            window.location.replace("/home")
        }
        else {
        return `
        ${Navbar()}
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
            <small></small>
            <div class='signup__form-control' id="firstName">
                <input type="text" id="firstname" placeholder="First Name"/>
            </div>
            <div class='signup__form-control' id="lastName">
                <input type="text" id="lastname" placeholder="Last Name"/>
                <small>Last Name</small>
            </div>
            <div class='signup__form-control' id="username">
                <input type="text" id="username" placeholder="Username"/>
                <small></small>
            </div>
            <div class='signup__form-control' id="email">
                <input type="email" id="email" placeholder="Email"/>
                <small></small>
            </div>
            <div class='signup__form-control' id="password">
                <input type="password" id="password" placeholder="Password"/>
                <small></small>
            </div>

            <div class='signup__form-control' id="birthdate">
                <input type="date" id="birth_date" placeholder="Birthdate"/>
                <small></small>
            </div>

            <div class='signup__form-control' id="location">
                <input type="location" id="location" placeholder="Location"/>
                <small></small>
            </div>

            <button style="text-transform:uppercase" id="signup-button">Sign up and claim your free trial</button>
            <small id="terms-and-services">By clicking the button, you are agreeing to our <a href="href">Terms and Services</a>.</small>
        </form>
    </div>
    </div>
    </div>
    `;
    }
    }

    async postRender() {
        const signUp = this.signUp;
        const addErrorTo = this.addErrorTo;
        const removeErrorFrom = this.removeErrorFrom;
        const isValid = this.isValid;

        const form = document.getElementById('signupform');
        form.addEventListener('submit', e => {
            e.preventDefault();
            const firstName = form['firstname'].value;
            const lastName = form['lastname'].value;
            const username = form['username'].value;
            const email = form['email'].value;
            const password = form['password'].value;
            const user = {
                firstName: firstName,
                lastName: lastName,
                username: username,
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

            if (username === '') {
                addErrorTo('username', 'User Name is required');
            } else {
                removeErrorFrom('username');
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
            if (firstName && lastName && username && email && password) this.signUp(firstName, lastName, username, email, password)

        })


    }
}
