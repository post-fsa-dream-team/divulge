const letterCount = require("./letterCount.js"); // same as ../index.js

describe ("the letterCount function", () => {
  it("letterCount returns the correct count of the letter passed in as a parameter", () => {
    expect(letterCount("awesome", "e")).toBe(2)
  })
})


// const posts = require("../server/api/posts")
// const router = require("../server/api/posts")

// describe("Users API endpoint test suite", () => {
//   it('GET request returns an array', async () => {
//     let result = await (router.get('/'))
//     expect(result).toBeInstanceOf(Array)
//   })
// })
