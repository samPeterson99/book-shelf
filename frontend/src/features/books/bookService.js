import axios from 'axios'

const API_URL = '/api/books/'

//Create new book
const createBook = async (bookData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.post(API_URL, bookData, config)

    return response.data
}

//get user books
const getUserBooks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const bookService = {
    createBook,
    getUserBooks
}

export default bookService