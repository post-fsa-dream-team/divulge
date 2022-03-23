// import Navbar from "../components/Navbar.js";
import AbstractView from "./AbstractView.js";

// console.log(process.env.MEDIUM_API_KEY);
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("MyPosts");
    }
    // async getMyPosts() {

    //     try {
    //         const myPosts = await fetch("http://localhost:3000/api/users/:userId/posts")
    //         const data = await myPosts.json()
    //         return data
    //     } catch (error) {
    //         console.log('CANNOT SEE MY POSTS :(', error);
    //     }
    // }
    async getHtml() {

        // let getPosts = async () => {
        //   const options = {
        //      method: 'GET',
        //      headers: {
        //          'Content-Type': 'application/json'
        //      }
        //  };
        //  try {
        //      const response = await fetch("/users/:userId/posts")
        //      const json = await response.json();
        //      // console.log(json)
        //      return json
        //  } catch (err) {
        //      console.log('Error getting documents', err)
        //  }
        // }
        // ${Navbar()}
        return `
        <div class='myposts'>
        <div class='myposts__leftsidebar'>
            <div class='myposts__leftsidebarcontent'>
                <h1>Logo</h1>
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
            <h1>@Username</h1>
            <div class='myposts__maincontentnav'>
                <h3>Home</h3>
                <h3>List</h3>
                <h3>About</h3>
            </div>
            <div class='myposts__maincontentposts'>
                <div class='myposts__article'>
                    <p>March 30th 2022</p>
                    <h1>Heading</h1>
                    <p>As almost every company on the planet is eventually becoming a technology company, the number of jobs in the technology sector has grown exponentially over the recent years. Even with the abundance of opportunities in this sector, technical interviews still remain to be a set of specialized, rigorous processes that test a candidate’s coding, problem-solving, design, and behavioral skills.</p>
                    <div class='myposts__articlebottom'>
                    <p>1 min read</p>
                    <div class='myposts__articlecontrol'>
                    <button>Edit</button>
                    <button>Delete</button>
                    </div>
                    </div>
                </div>
                <div class='myposts__article'>
                    <p>March 30th 2022</p>
                    <h1>Heading</h1>
                    <p>As almost every company on the planet is eventually becoming a technology company, the number of jobs in the technology sector has grown exponentially over the recent years. Even with the abundance of opportunities in this sector, technical interviews still remain to be a set of specialized, rigorous processes that test a candidate’s coding, problem-solving, design, and behavioral skills.</p>
                    <div class='myposts__articlebottom'>
                    <p>1 min read</p>
                    <div class='myposts__articlecontrol'>
                    <button>Edit</button>
                    <button>Delete</button>
                    </div>
                    </div>
                </div>
                <div class='myposts__article'>
                    <p>March 30th 2022</p>
                    <h1>Heading</h1>
                    <p>As almost every company on the planet is eventually becoming a technology company, the number of jobs in the technology sector has grown exponentially over the recent years. Even with the abundance of opportunities in this sector, technical interviews still remain to be a set of specialized, rigorous processes that test a candidate’s coding, problem-solving, design, and behavioral skills.</p>
                    <div class='myposts__articlebottom'>
                    <p>1 min read</p>
                    <div class='myposts__articlecontrol'>
                    <button>Edit</button>
                    <button>Delete</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div class='myposts__rightsidebar'>Right sidebar</div>
        </div>}
        `;
    }
}
