//main entry point
console.log("Entered the index.js file")

const router = async () => {

  const routes = [
    { path: "/404", view: () => console.log("viewing 404 not found") },
    { path: "/", view: () => console.log("viewing home") },
    { path: "/posts", view: () => console.log("viewing posts") },
    //HOW TO ADD VARIABLES?
    { path: "/posts/USERID", view: () => console.log("viewing single post") },
  ]

  const potentialMatches = routes.map(route => {
    return {
      route: route,
      //check of current path name in browser matches any of our defined routes
      isMatch: location.pathname === route.path
    }
  })

  let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

  if (!match) {
      match = {
          route: routes[0],
          result: [location.pathname]
      };
  }

  console.log(potentialMatches)
  console.log(match)
}

document.addEventListener("DOMContentLoaded", () => {
  router();
})
