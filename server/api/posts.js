const router = require('express').Router();
const { pool } = require('../db');


router.post('/', async (req, res, next) => {
  try {
    const { title, content, image_url, category, user_id} = req.body;
    const response = await pool.query('INSERT INTO posts (title, content, image_url, category, user_id) VALUES ($1, $2, $3, $4, $5)', [title, content, image_url, category, user_id]);
    if (!response) throw new Error;
    res.status(201).json(req.body);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
