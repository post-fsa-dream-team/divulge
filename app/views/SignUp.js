import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("SignUp");
    }

    async getHtml() {
        return `
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

        <form class='signup__form' id='form'>
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

        <button style="text-transform:uppercase">Sign up and claim your free trial</button>
        <small>By clicking the button, you are agreeing to our <a href="href">Terms and Services</a>.</small>
    </form>
    </div>
    </div>
    </div>
    <script>
const form = document.getElementById('form')
form.addEventListener('submit', e => {
    e.preventDefault();
})
    </script>
    `;
    }
}
