//main entry point
console.log("Entered the index.js file")

import Home from "./views/Home.js"
import SignUp from "./views/SignUp.js";
import SignIn from "./views/SignIn.js";
import CreatePost from "./views/CreatePost.js";
import MyPosts from "./views/MyPosts.js";
import MySinglePost from "./views/MySinglePost.js";
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async() => {
    const routes = [
        { path: "/404", view: Home },
        { path: "/home", view: Home },
        { path: "/posts", view: Home },
        { path: "/profile", view: Home },
        { path: "/signin", view: SignIn },
        { path: "/signup", view: SignUp },
        //HOW TO ADD VARIABLES?
        { path: "/:userId/posts/:id", view: MySinglePost },
        { path: "/:userId/posts", view: MyPosts },
        { path: "/:userId/posts/:postid", view: Home },
        { path: "/createpost", view: CreatePost },
    ]

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
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
    const view = new match.route.view()
    document.querySelector("#app").innerHTML = await view.getHtml()
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
