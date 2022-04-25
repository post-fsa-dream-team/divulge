const router = require('express').Router();
const { pool } = require('../db');

//All users
router.get('/', async (req, res, next) => {
  try {
    let userData = await pool.query('SELECT id, user_name, first_name, last_name, email, birth_date, location, created_at, last_login, is_admin FROM users');
    res.status(200).json(userData.rows)
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/limitedusers', async (req, res, next) => {
  try {
    let userData = await pool.query('SELECT id, user_name, first_name, last_name, email, birth_date, location, created_at, last_login, is_admin FROM users');
    let response = userData.rows.map(user => {
      return {
        id: user.id,
        user_name: user.user_name,
        first_name: user.first_name,
        last_name: user.last_name
      }
    })
    res.status(200).json(response)
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//My Profile
router.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [userId])
    res.send(rows[0])
  } catch (error) {
    console.log(error);
    next(error);
  }
})

router.get('/:userId/limiteduser', async (req, res, next) => {
  try {
    const { userId } = req.params
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [userId])

    let response = rows[0].rows.map(user => {
      return {
        user_name: user.user_name,
      }
    })
    res.send(response)
  } catch (error) {
    console.log(error);
    next(error);
  }
})

router.get("/loggedindata", async (req,res,next) => {
  try {
    const sessionData = req.session
    return sessionData
  } catch (error) {
    next(error)
  }
})

//Edit My Profile
router.put('/:userId', async (req, res, next) => {
  try {

  } catch (error) {
    console.log(error);
    next(error);
  }
})

//delete my profile
router.delete('/:id', async (req, res, next) => {
  try {
    // const { userId } = req.params
    // pool.query('delete from users where id = $1', [userId], (error, results) => {
    //   if (error) {
    //     throw error
    //   }
    //   res.status(200).send(`User deleted with ID: ${userId}`)
    // })
  } catch (error) {
    console.log(error);
    next(error);
  }
})
/*****************ATTEMPT********** */
//My Posts
router.get('/:userId/posts', async (req, res, next) => {
  try {
    const { userId } = req.params
    // const response = await pool.query(`SELECT * FROM users INNER JOIN posts ON users.id = posts.user_Id `) ---> /postId/posts
    const myPosts = await pool.query(`select * from users inner join posts on users.id = posts.user_Id where users.id = $1`, [userId])
    res.status(200).json(myPosts.rows)
  } catch (error) {
    console.log(error);
    next(error);
  }
})

//My Single Post
router.get('/:userId/posts/:postId', async (req, res, next) => {
  try {
    const { userId, postId } = req.params;
    const myPost = await pool.query(`select * from users inner join posts on users.id = posts.user_Id where users.id = $1 and posts.id = $2`, [userId, postId])
    res.status(200).json(myPost.rows)
  } catch (error) {
    console.log(error);
    next(error);
  }
})

module.exports = router;
