//main entry point
console.log("Entered the index.js file")
import LandingPage from "./views/LandingPage.js"
import SignUp from "./views/SignUp.js";
import SignIn from "./views/SignIn.js";
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


const router = async () => {

  const routes = [
    { path: "/404", view: () => console.log("viewing 404 not found") },
    { path: "/", view: LandingPage },
    { path: "/posts", view: () => console.log("viewing posts") },
    { path: "/profile", view: () => console.log("viewing profile") },
    { path: "/signin", view: SignIn },
    { path: "/signup", view: SignUp },
    //HOW TO ADD VARIABLES?
    { path: "/posts/USERID", view: () => console.log("viewing single post") },
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
  // Create a new instance at the match route
  const view = new match.route.view(getParams(match));

  document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
