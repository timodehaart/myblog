const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
    db.all('SELECT * FROM posts ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            // Handle the error gracefully, e.g., log it and send an error response
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('index', { posts: rows });
    });
});

router.get('/new', (req, res) => {
    res.render('new');
});

router.post('/', (req, res) => {
    const { title, content } = req.body;
    
    // Check if title or content is missing
    if (!title || !content) {
        return res.status(400).send('Title and content are required' + title + content);
    }

    db.run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], (err) => {
        if (err) {
            // Handle the error gracefully, e.g., log it and send an error response
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/blogs');
    });
});

module.exports = router;