const letterCount = require("./letterCount.js"); // same as ../index.js

describe ("the letterCount function", () => {
  it("letterCount returns the correct count of the letter passed in as a parameter", () => {
    expect(letterCount("awesome", "e")).toBe(2)
  })
})

// const posts = require("../server/api/posts")
const router = require("../server/api/posts")

// describe('GET /users', function(){
//   it('respond with json', function(done){
//     request(app)
//       .get('/users')
//       .set('Accept', 'application/json')
//       .expect(200)
//       .end(function(err, res){
//         if (err) return done(err);
//         done()
//       });
//   })
// });

//TESTING THE FRONTEND

import { default as Home } from "../app/views/Home"

describe('Home page view', () => {
  it("gets the 'posts' data from the database", () => {
    expect(Home).toBe("array")
  })
})

