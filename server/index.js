//backend root
const express = require('express')
const app = express()
const path = require('path')
const client = require("./db.js")
const session = require('express-session');
const passport = require('passport')

const initializePassport = require("../passportConfig");

initializePassport(passport);


//bodyparsing middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(session({
  // Key we want to keep secret which will encrypt all of our information
	secret: 'secret',
  // Should we resave our session variables if nothing has changes which we dont
	resave: true,
  // Save empty value if there is no vaue which we do not want to do
	saveUninitialized: true
}));

// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());

// static middleware
// app.use(express.static(path.join(__dirname, '../public')))
app.use('/app', express.static(path.join(__dirname, "../app")))

app.use('/api', require('./api')) // ----> include our routes
app.use('/auth', require('./authentication/auth')) // ------> for sign up and sign in and home

//send index.html for any other requests
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

//connect to postgres db
app.get("/", async (req, res, next) => {
  try{
    const data = await client.query('SELECT * FROM posts');
    const posts = data.rows;
    res.send(postList(posts));
  } catch (error) {
    next(error)
  }
})

app.post(
  "/auth/signin",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/auth/signin",
    failureFlash: true
  })
);
const PORT = 3000 || process.env.PORT;

app.listen(PORT, function () {
  console.log(`Mixing it up on port ${PORT}`)
})

// error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.exports = app;
