const router = require('express').Router();
const { pool } = require('../db');
const { userPostRelationship } = require('./gatekeeper');


router.get('/', async(req, res, next) => {
    try {
        const response = await pool.query('SELECT p.id as post_id, p.title, p.image_url, p.content, p.category, p.created_at, p.user_id, u.user_name, u.id, u.first_name, u.last_name, u.email from POSTS p LEFT JOIN users u ON p.user_id = u.id')
        res.status(200).json(response.rows)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post('/', userPostRelationship, async(req, res, next) => {
    try {
        const { title, content, image_url, category, user_id } = req.body;
        const response = await pool.query('INSERT INTO posts (title, content, image_url, category, user_id) VALUES ($1, $2, $3, $4, $5)', [title, content, image_url, category, user_id]);
        if (!response) throw new Error;
        res.status(201).json(req.body);
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/:id', async(req, res, next) => {
  try {
    let id = req.params.id
    const response = await pool.query(`SELECT p.id as post_id, p.title, p.image_url, p.content, p.category, p.created_at, p.user_id, u.user_name, u.id, u.first_name, u.last_name from POSTS p LEFT JOIN users u ON p.user_id = u.id WHERE p.id = ${id}`)
    res.status(200).json(response.rows)
  } catch (error) {
      console.log(error)
      next(error)
  }
})

router.put('/:id', userPostRelationship, async(req, res, next) => {
    try {
        const { id } = req.params;
        const { title, image_url, content, category } = req.body;
        const response = await pool.query('UPDATE posts SET title = $1, image_url = $2, content = $3, category = $4 WHERE ID = $5', [title, image_url, content, category, id]);
        if(!response) throw new Error('Something went wrong with PUT route!');
        res.status(201).json(req.body);
    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.delete('/:id', userPostRelationship, async(req, res, next) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM posts WHERE ID = $1', [id]);
        res.status(200).send('Post Successfully Deleted.');
    } catch (error) {
        console.log(error);
        next(error);
    }
})

module.exports = router;
