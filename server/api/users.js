const router = require('express').Router();
const { pool } = require('../db');


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

module.exports = router;
