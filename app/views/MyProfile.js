// import moment from 'moment';
import Navbar from "../components/Navbar.js";
import AbstractView from "./AbstractView.js";
import DeletePost from "../components/DeletePost.js";

// console.log(process.env.MEDIUM_API_KEY);
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("MyPosts");
        this.userId = sessionStorage.getItem('id');
        this.postData = {};
    }
    async getMyPosts(userId) {
        try {
            const myPosts = await fetch(`http://localhost:3000/api/users/${userId}/posts`)
            const data = await myPosts.json()
            this.postData = data[0];
            return data
        } catch (error) {
            console.log('CANNOT SEE MY POSTS :(', error);
        }
    }

    convertDate(date) {
      let splitIndex = date.split("").indexOf("T")
      let dayOnly = date.slice(0, splitIndex)
      let justDateItems = new Date(dayOnly).toString().split(" ")
      console.log(justDateItems)
      let month = justDateItems[1]
      let day = justDateItems[2]
      let year = justDateItems[3]

      let months = {
        "Jan": 'January',
        "Feb": 'February',
        "Mar":"March",
        "Apr": "April",
        "May":"May",
        "Jun":"June",
        "Jul":"July",
        "Aug":"August",
        "Sep":"September",
        "Oct":"October",
        "Nov":"November",
        "Dec":"December"
      }
      return `${months[month]} ${day}, ${year}`
    }

    async getHtml() {
        const myPosts = await this.getMyPosts(this.userId)
        console.log('myPosts', myPosts);

        const deletePost = new DeletePost(this.postData?.id);

        const protocol = document.location.protocol;
        const host = document.location.host;

        return `
        ${Navbar()}
        <div class='myposts'>

        <div class='myposts__leftsidebar'>
          <div class="myposts__sidebaricons">
                <h3>Home</h3>
                <h3>List</h3>
                <h3>About</h3>
          </div>
        </div>

        <div class='myposts__maincontent'>
            <h1>@${myPosts.length && myPosts[0].user_name}</h1>

            ${myPosts.length && myPosts.map((post) => {
                return `
            <div class='myposts__maincontentposts'>
                <div class='myposts__article'>
                    <p>${this.convertDate(post.created_at)}</p>
                    <h1>${post.title}</h1>
                    <p>${post.content.slice(0, 360)}...</p>
                    <div class='myposts__articlebottom'>
                    <p>${Math.ceil(post.content.length / 500)} min read</p>

                    <div id="button-containers">
                        <a id="edit-link" href="${protocol}//${host}/editpost/${post.id}">Edit</a>
                        ${deletePost.render()}
                    </div>

                    </div>
                </div>
            </div>
            `})}
        </div>


        <div class='myposts__rightsidebar'>Right sidebar</div>


        </div>`
    }

    async postRender() {
        const deletePost = new DeletePost(this.postData?.id);
        this.postData?.id && deletePost.script();
    }
}

{/* <div class='myposts__leftsidebar'>
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
</div> */}
