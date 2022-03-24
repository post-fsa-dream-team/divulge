//main entry point
console.log("Entered the index.js file")

import Home from "./views/Home.js"
import OtherSinglePost from "./views/OtherSinglePost.js";
import SignUp from "./views/SignUp.js";
import SignIn from "./views/SignIn.js";
import CreatePost from "./views/CreatePost.js";
import MyPosts from "./views/MyPosts.js";
import MySinglePost from "./views/MySinglePost.js";
import OtherAllPosts from "./views/OtherAllPosts.js";

//see tool: https://regexr.com/
//match the first character of the string ->
//^ Carat, matches a term if the term appears at the beginning of a paragraph or a line.
const pathToRegex = path => new RegExp("^" + path
//replace all forward slashes inside the path with escaped character (matches "/")
.replace(/\//g, "\\/")
//then replace each parameter (any string after a colon and before a slash or the end) with a capture group
//$ Dollar sign, matches a term if the term appears at the end of a paragraph or a line.
.replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    //values are the parameters passed in through path; slicing at index 1 returns all parameters
    // console.log(match.result)
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
    // console.log(window.location.pathname)
    const routes = [
        { path: "/404", view: Home },
        { path: "/home", view: Home },
        { path: "/posts/:category", view: OtherAllPosts },
        { path: "/profile", view: Home },
        { path: "/signin", view: SignIn },
        { path: "/signup", view: SignUp },
        { path: "/posts/:id", view: OtherSinglePost },
        { path: "/mysinglepost", view: MySinglePost },
        { path: "/myposts", view: MyPosts },
        { path: "/:userId/posts/:postid", view: Home },
        { path: "/createpost", view: CreatePost },
    ]

    // Test each route to see if the pathname in the URL matches the regex pattern of the path
    const potentialMatches = routes.map(route => {
        // console.log(pathToRegex(route.path))
        console.log(location.pathname)
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    //let match equal the response from above where the "result" does not equal null
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    //if there is no match, match to 404 route
    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    //Render the view by calling the class for that view
    //e.g. of the path is "/home", new match.route.view() === new Home()
    //use "getParams" to access the params and send them in as parameters to the class
    const view = new match.route.view(getParams(match))
    console.log(getParams(match))

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
