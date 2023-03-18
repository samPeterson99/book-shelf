const mongoose = require('mongoose')

const bookSchema = mongoose.Schema(
{
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, {
    timestampes: true
})

module.exports = mongoose.model('Book', bookSchema)