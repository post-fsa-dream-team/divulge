const router = require('express').Router();
const { pool } = require('../db');

/*********SIGN IN, SIGN UP ************/
/**For signup, we need to check if the user exists
   - No users found: create new user
   - Found existing email: login
 */
router.post('/signup', async (req, res) => {
  try {
    console.log('req.body', req.body);
    const { user_name, first_name, last_name, email, password, birth_date, location } = req.body

    /**Errors handler */
    let errors = [];
    if (!user_name || !first_name || !last_name || !email || !password || !birth_date || !location) errors.push({ message: "Please enter all fields" })

    if (password.length < 3) errors.push({ message: "Password should be at least 3 characters" })

/**Simple approach, will create duplicate users
    const newUser = await pool.query('INSERT INTO users (user_name, first_name, last_name, email, password, birth_date, location) VALUES ($1, $2, $3, $4, $5, $6, $7)', [user_name, first_name, last_name, email, password, birth_date, location], (error, results) => {
      if (error) throw error
      if (results.rows.length > 0) {
        errors.push({ message: "Email already existed 🙊"})
        res.render("signup", { errors })
      }
      if (req.body.email) res.status(201).send('User Signed Up!')
      console.log('results', results);
    })

    // Check if newUser is in the valid data ? send newUser : console.log('error msg')
    newUser ? res.json(newUser) : console.log('Need more information from this user');*/
    await pool.query(
      `SELECT * FROM users
      WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log('results.rows', results.rows);

        if (results.rows.length > 0) {
          res.status(401).send('User already exists')
          /**Restart pg server to write new user */
        } else {
          pool.query(
            `INSERT INTO users (user_name, first_name, last_name, email, password, birth_date, location)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, password`,
            [user_name, first_name, last_name, email, password, birth_date, location],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              console.log("success_msg", "You are now registered. Please log in");
              res.redirect("/signin");
            }
          )
        }
      }
    )
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
router.post('/signin', async (req, res, next) => {
  try {
    // console.log('req', req);
    const { email, password } = req.params
    const user = await pool.query(`SELECT FROM users WHERE email='$email' AND password='$password'`, [email, password])
    console.log('user', user);
    res.json(user)
  } catch (error) {
    console.log(error);
    next(error)
  }
})

module.exports = router;
