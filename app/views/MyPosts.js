// import moment from 'moment';
import Navbar from "../components/Navbar.js";
import AbstractView from "./AbstractView.js";

// console.log(process.env.MEDIUM_API_KEY);
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("MyPosts");
        this.userId = params.userId;
    }
    async getMyPosts(userId) {
        try {
            const myPosts = await fetch(`http://localhost:3000/api/users/${userId}/posts`)
            const data = await myPosts.json()
            return data
        } catch (error) {
            console.log('CANNOT SEE MY POSTS :(', error);
        }
    }
    // ${Navbar()}
    async getHtml() {
        const myPosts = await this.getMyPosts(this.userId)
        console.log('myPosts', myPosts);
        return `
        <div class='myposts'>
        <div class='myposts__leftsidebar'>
            <div class='myposts__leftsidebarcontent'>
                <h1>Divulge</h1>
            </div>
            <div class="myposts__sidebaricons">
                <h3>Home</h3>
                <h3>Create</h3>
            </div>
            <div class="myposts__sidebarprofile">
                <h2>Profile</h2>
            </div>
        </div>
        <div class='myposts__maincontent'>
            <h1>@${myPosts[0].user_name}</h1>
            <div class='myposts__maincontentnav'>
                <h3>Home</h3>
                <h3>List</h3>
                <h3>About</h3>
            </div>
            ${myPosts.map((post) => {
                return `
            <div class='myposts__maincontentposts'>
                <div class='myposts__article'>
                    <p>${post.created_at}</p>
                    <h1>${post.title}</h1>
                    <p>${post.content.slice(0, 360)}...</p>
                    <div class='myposts__articlebottom'>
                    <p>${Math.ceil(post.content.length / 500)} min read</p>
                    <div class='myposts__articlecontrol'>
                    <button>Edit</button>
                    <button>Delete</button>
                    </div>
                    </div>
                </div>
            </div>
            `})}
        </div>
        <div class='myposts__rightsidebar'>Right sidebar</div>
        </div>}`
    }
}
