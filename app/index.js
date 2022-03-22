//main entry point
console.log("Entered the index.js file")

import Home from "./views/Home.js"
import OtherSinglePost from "./views/OtherSinglePost.js";
import SignUp from "./views/SignUp.js";
import SignIn from "./views/SignIn.js";
import CreatePost from "./views/CreatePost.js";
import MyPosts from "./views/MyPosts.js";
import MySinglePost from "./views/MySinglePost.js";

//match the first character of the string ->
const pathToRegex = path => new RegExp("^" + path
//replace all forward slashes inside the path with the regular expression equivalent for a slash
.replace(/\//g, "\\/")
//then replace each parameter with a capture group
.replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    //values are the parameters passed in through path; slicing index 1 returns all parameters
    const values = match.result.slice(1);

    //grab the keys (e.g. 'id'), match all will grab all individual paramaters (anything after a colon),
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    //loop through each of the keys; return the key in an array and then the values at the index of the key
    //Object.fromEntries takes multidimensional array and converts to object
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async() => {
    console.log(window.location.pathname)
    const routes = [
        { path: "/404", view: Home },
        { path: "/home", view: Home },
        // { path: "/posts", view: Home },
        { path: "/profile", view: Home },
        { path: "/signin", view: SignIn },
        { path: "/signup", view: SignUp },
        //HOW TO ADD VARIABLES?
        { path: "/posts/:id", view: OtherSinglePost },
        { path: "/mysinglepost", view: MySinglePost },
        { path: "/myposts", view: MyPosts },
        { path: "/:userId/posts/:postid", view: Home },
        { path: "/createpost", view: CreatePost },
    ]

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        // console.log(pathToRegex(route.path))
        console.log("/posts/1".match(pathToRegex(route.path)))
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match))

    document.querySelector("#app").innerHTML = await view.getHtml()
    await view.postRender();
}

//run the router when client navigates through history (e.g. clicks back button)
window.addEventListener("popstate", router)

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault()
            navigateTo(e.target.href)
        }
    })
    router();
});
