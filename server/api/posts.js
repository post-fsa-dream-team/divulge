const router = require('express').Router();
const { pool } = require('../db');


router.post('/', async(req, res, next) => {
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

router.get('/', async(req, res, next) => {
    try {
        const response = await pool.query('SELECT p.id, p.title, p.image_url, p.content, p.category, p.created_at, p.user_id, u.user_name, u.id, u.first_name, u.last_name from POSTS p LEFT JOIN users u on p.user_id = u.id')
        res.status(200).json(response.rows)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = router;