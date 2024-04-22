const express = require('express');
const router = express.Router();
const errorController = require('../controllers/error');

router.use(function(req, res, next) {
    res.status(404).render('not-found', { title: 'Page Not Found' });
});

module.exports = router;
