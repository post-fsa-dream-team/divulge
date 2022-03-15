//main entry point
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

document.addEventListener("DOMContentLoaded", () => {
  router();
})
