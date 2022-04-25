// import moment from 'moment';
import Navbar from "../components/Navbar.js";
import AbstractView from "./AbstractView.js";
import DeletePost from "../components/DeletePost.js";

// console.log(process.env.MEDIUM_API_KEY);
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("My Profile");
        this.userId = sessionStorage.getItem('id');
        this.postData = {};
    }
    async getmyprofile(userId) {
      const port = /localhost/.test(window.location.href)
      ? "http://localhost:3000/api"
      : "https://divulge-web-app.herokuapp.com/api";
        try {
            const myprofile = await fetch(`${port}/users/${userId}/posts`)
            const data = await myprofile.json()
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
        const myprofile = await this.getmyprofile(this.userId)

        const deletePost = new DeletePost(this.postData?.id);

        const protocol = document.location.protocol;
        const host = document.location.host;

        const userName = sessionStorage.getItem("user_name")
        const firstName = sessionStorage.getItem("first_name")
        const lastName = sessionStorage.getItem("last_name")
        const location = sessionStorage.getItem("location")
        const account_created = sessionStorage.getItem("created_at")

        return `
        ${Navbar()}
        <div class='myprofile'>

        <div class='myprofile__leftsidebar'>
        <div id='myprofile__poststitlecontainer'>
            <h3 class="myprofile__sidebartext">My Profile</h3>
            </div>
        </div>



        <div class='myprofile__maincontent'>


          <h1 class="myprofile__poststitle">Your Posts</h1>

            <div>
              ${myprofile.length === 0 ? `
              <p class="myprofile__noposts">You don't have any posts yet!</p>
              <p> <a class="myprofile__firstpostlink" href="${this.userId}/createpost"> Create </a> your first post.</p>`
               : myprofile.map((post) => {
                  return `
              <div class='myprofile__maincontentposts'>

                <h1 class='myprofile__articletitle'><a href="posts/${post.id}">${post.title}</a></h1>
                <p class="myprofile__date">${this.convertDate(post.created_at)}</p>
                <p class='myprofile__postcontent'>${post.content.slice(0, 360)}...</p>
                <p class="myprofile__mins"> ${Math.ceil(post.content.length / 500)} min read</p>

                <a class="myprofile__editbutton" id="edit-link" href="${protocol}//${host}/editpost/${post.id}">
                    Edit
                </a>

                <div class="myprofile__deletebutton">
                    ${deletePost.render()}
                </div>
              </div>

              `}).join('')}
          </div>
        </div>


        <div class="myprofile__rightsidebar">

          <div class="myprofile__userinfocontainer">
            <img class="myprofile__userimage" src="https://ca.slack-edge.com/T0266FRGM-U015ZPLDZKQ-gf3696467c28-512" alt="default-user-img"/>
            <p class="myprofile__username">@${userName}</p>
            <p class="myprofile__accountcreated"> Author Since: ${this.convertDate(account_created)}</p>
            <p class="myprofile__name"> ${firstName} ${lastName} </p>
            <p class="myprofile__location"> ${location}</p>

          </div>
        </div>


        </div>`
    }

    async postRender() {
        const deletePost = new DeletePost(this.postData?.id);
        this.postData?.id && deletePost.script();
    }
}

{/* <div class='myprofile__leftsidebar'>
<div class='myprofile__leftsidebarcontent'>
    <h1>Divulge</h1>
</div>
<div class="myprofile__sidebaricons">
    <h3>Home</h3>
    <h3>Create</h3>
</div>
<div class="myprofile__sidebarprofile">
    <h2>Profile</h2>
</div>
</div> */}
