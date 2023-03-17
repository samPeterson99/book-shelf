const express = require('express');
const router = express.Router();
const { getBook, addBook, updateBook, deleteBook } = require('../controllers/bookControllers')

router.route('/').get(getBook).post(addBook)

router.route('/:id').put(updateBook).delete(deleteBook)



module.exports = router;