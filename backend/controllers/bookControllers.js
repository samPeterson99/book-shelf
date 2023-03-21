const asyncHandler = require('express-async-handler')

const Book = require('../models/bookModel')
const User = require('../models/userModel')

// @desc    Get books
//  @route  GET /api/goals
// @access  Private
const getBook = asyncHandler(async (req, res) => {
    const books = await Book.find({ user: req.user.id})


    res.status(200).json({message: books})
})

// @desc    add books
//  @route  POST /api/goals
// @access  Private
const addBook = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        console.log(req.body.text)
        throw new Error('please add a text field')
    }

    const book = await Book.create({
        text: req.body.text,
        user: req.user.id
    })
    
    res.status(200).json({book})
})

// @desc    update books
//  @route  PUT /api/goals/:id
// @access  Private
const updateBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)

    if(!book) {
        res.status(400)
        throw new Error('Book not found')
    }

    const user = await User.findById(req.user.id)

    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //match user and book user
    if(book.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedBook)
})

// @desc    delete books
//  @route  DELETE /api/goals/:id
// @access  Private
const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)

    if(!book) {
        res.status(400)
        throw new Error('Book not found')
    }

    const user = await User.findById(req.user.id)

    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //match user and book user
    if(book.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await book.deleteOne(book)

    res.status(200).json(req.params.id)
})

module.exports = { 
    getBook,
    addBook,
    updateBook,
    deleteBook
}