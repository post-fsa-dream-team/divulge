//main entry point
const navigateTo = url => {
  //pushState takes three parameters:
  //1) state;
  //2) unused (exists for historical reasons and cannot be omitted, can pass in empty string, null, etc);
  //3. url, can be relative to current URL
  history.pushState(null, null, url)
  router();
}

console.log("Entered the index.js file")

const router = async () => {

  const routes = [
    { path: "/404", view: () => console.log("viewing 404 not found") },
    { path: "/", view: () => console.log("viewing home") },
    { path: "/posts", view: () => console.log("viewing posts") },
    { path: "/profile", view: () => console.log("viewing profile") },
    //HOW TO ADD VARIABLES?
    { path: "/posts/USERID", view: () => console.log("viewing single post") },
  ]

  //test each route for potential match
  const potentialMatches = routes.map(route => {
    return {
      route: route,
      //check of current path name in browser matches any of our defined routes
      isMatch: location.pathname === route.path
    }
  })

  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

  if (!match) {
      match = {
          route: routes[0],
          isMatch: true
          // result: [location.pathname]
      };
  }

  console.log(match.route.view())
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
})
