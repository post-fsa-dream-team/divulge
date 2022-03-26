const router = require('express').Router();
const { pool } = require('../db');

/*********SIGN IN, SIGN UP. Tutorial: https://www.youtube.com/watch?v=vxu1RrR0vbw ************/
/**For signup, we need to check if the user exists
   - No users found: create new user
   - Found existing email: login
   - Hashing & Salting (bcrypt)
 */
router.post('/signup', async (req, res, next) => {
  try {
    const { user_name, first_name, last_name, email, password, birth_date, location } = req.body;
    /* error handler */
    if (!user_name || !first_name || !last_name || !email || !password || !birth_date || !location) {
      throw new Error("More information required")
    }

    if (password.length < 3) {
      throw new Error("Password should be at least 3 characters")
    }

    /**Check if user exists */
    let userCheck = await pool.query('select * from users where email = $1 or user_name = $2', [email, user_name])
    if (userCheck.rows.length) {
      /**if duplicate user is found */
      res.status(401).send("Email/Username already existed")
    } else {
      /*if no duplicate user is found, create new user*/
      await pool.query('insert into users (user_name, first_name, last_name, email, password, birth_date, location) values ($1, $2, $3, $4, $5, $6, $7)', [user_name, first_name, last_name, email, password, birth_date, location])
      res.status(200).send(req.body)
    }

  } catch (error) {
    console.log(error);
    next(error)
  }
})

/**For Sign In, we need to:
  - Find the user email
  - No users:
        console.log('No such user found:', req.body.email)
        res.status(401).send('Wrong username and/or password')
  - Password is not correct:
        console.log('Incorrect password for user:', req.body.email)
        res.status(401).send('Wrong username and/or password')
  - User found:  req.login(user, err => (err ? next(err) : res.json(user)))
 */

//WORKS//
/**NEED TO FIX AFTER THIS LINE 👇👇👇 */
router.post('/signin', async (req, res, next) => {
  try {
    // console.log('req.body', req.body); //----> { email: 'james12@fs.com', password: 'test123' }
    const { email, password } = req.body
    if (email && password) {
      // Execute SQL query that'll select the account from the database based on the specified username and password
      let result= await pool.query('select * from users where email = $1 and password = $2', [email, password])
        //If there us a user match in DB, do something
        if (result.rows.length) {
          // Authenticate the user
          if (result.rows[0].is_admin === true)  sessionStorage.setItem("admin", true);
          sessionStorage.setItem("auth", result.rows[0].id)
          console.log('Yayy!! Logged in 🙌🙌🙌');
          res.redirect('/home');
          //If no match, send message
        } else {
          res.send('Incorrect Email and/or Password!');
        }
      }
      //If input is missing email or password, send message
      else {
      res.send('Please enter Email and Password!');
    }
  } catch (error) {
    console.log(error);
    next(error)
  }
})
/**NEED TO FIX BEFORE THIS LINE 👆👆👆 */

/**This part is 🌟fine🌟. But I comment out because "signin" is not working*/
// router.get('/home', function(req, res) {
//   // If the user is loggedin
//   if (req.session.loggedin) {
//     // Output username
//     res.send('Welcome back, ' + req.session.username + '!');
//   } else {
//     // Not logged in
//     res.send('Please login to view this page!');
//   }
//   res.end();
// });

// router.get('/logout', (req, res) => {
//   req.logout()
//   req.session.destroy()
//   console.log('You have logged out successfully');
//   res.redirect('/')
// })


module.exports = router;
