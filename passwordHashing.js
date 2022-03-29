const bcrypt = require("bcrypt")
const { database } = require("pg/lib/defaults")

const hashSeededPassword = (password) => {
  try {
    let hashedPassword = bcrypt.hashSync(password, 10)
    return hashedPassword

  } catch (error) {
    console.log(error)
  }
}

// let hashedPasswords = hashSeededPassword()

const hashAllPasswords = (array) => {
  let passwords = {}
  array.forEach(element => {
    console.log(element[0])
    passwords[element[0]] = hashSeededPassword(element[1])})
  return passwords
}

console.log(hashAllPasswords([["james01", "test123"], ["lizfriz39", "test2143"], ["henrydacoolguy55", "test9876"], ["francescafrey38", "test54523"], ["jackimmature69", "345test"], ["moneygurl4Hash", "test32462"]]))
