//backend root
const express = require('express')
const app = express()
const path = require('path')
const client = require("./db.js")

//bodyparsing middleware

app.use(express.json())

//static middleware
// app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../app/index.js')))

app.use('/api', require('./api')) // ----> include our routes

//send index.html for any other requests
app.get('*', (req, res) => {
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
