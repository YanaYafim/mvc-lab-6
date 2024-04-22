const express = require('express');
const bookController = require('../controllers/book');

const router = express.Router();

// Dodajemy kontroler dla GET na ścieżce /books/:id
router.get('/:id', bookController.getBookDetails);

// Dodajemy kontroler dla POST na ścieżce /books/borrow/:id
router.post('/borrow/:id', bookController.postBookBorrow);

// Dodajemy kontroler dla POST na ścieżce /books/return/:id
router.post('/return/:id', bookController.postBookReturn);

// Dodajemy kontroler dla GET na ścieżce /books/borrow/success
router.get('/borrow/success', bookController.getBookBorrowSuccess);

// Dodajemy kontroler dla GET na ścieżce /books/return/success
router.get('/return/success', bookController.getBookReturnSuccess);

module.exports = router;
