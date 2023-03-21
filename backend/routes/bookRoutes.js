const express = require('express');
const router = express.Router();
const { getBook, addBook, updateBook, deleteBook } = require('../controllers/bookControllers')
const {protect} =require('../middleware/authMiddleware')

router.route('/').get(protect, getBook).post(protect, addBook)

router.route('/:id').put(protect, updateBook).delete(protect, deleteBook)



module.exports = router;