const router = require('express').Router();
const { pool } = require('../db');

//All users
router.get('/', async (req, res, next) => {
  try {
    let userData = await pool.query('SELECT * FROM users');
    // console.log('req.body', req.body);
    // console.log('userData', userData);
    res.status(200).json(userData.rows)
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//My Profile
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [userId])
    res.send(rows[0])
  } catch (error) {
    console.log(error);
    next(error);
  }
})


/*****************ATTEMPT********** */
//My Posts
router.get('/:userId/posts', async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    next(error);
  }
})

//My Single Post
router.get('/:userId/posts/:postId', async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    next(error);
  }
})

module.exports = router;
