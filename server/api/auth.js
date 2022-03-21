const router = require('express').Router();
const { pool } = require('../db');

/*********SIGN IN, SIGN UP ************/

router.post('/signup', async (req, res) => {
  console.log('req.body', req.body
  );
  const { user_name, first_name, last_name, email, password, birth_date, location } = req.body

  const newUser = await pool.query('INSERT INTO users (user_name, first_name, last_name, email, password, birth_date, location) VALUES ($1, $2, $3, $4, $5, $6, $7)', [user_name, first_name, last_name, email, password, birth_date, location], (error, results) => {
    if (error) {
      throw error
    }
    console.log('results', results);
    if (req.body.email)
    response.status(201).send(`User added with ID: ${results}`)
  })
})

router.post('./signin', async (req, res) => {
  try {
    // const user = await User.findOne({ where: { email: req.body.email } })
    // if (!user) {
    //   console.log('No such user found:', req.body.email)
    //   res.status(401).send('Wrong username and/or password')
    // } else if (!user.correctPassword(req.body.password)) {
    //   console.log('Incorrect password for user:', req.body.email)
    //   res.status(401).send('Wrong username and/or password')
    // } else {
    //   await Cart.update(
    //     { userId: user.id },
    //     { where: { sessionId: req.session.id } }
    //   )
    //   req.login(user, err => (err ? next(err) : res.json(user)))
    // }
  } catch (error) {
    console.log(error);
    next(error)
  }
})

module.exports = router;
