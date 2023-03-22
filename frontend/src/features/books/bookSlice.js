import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from './bookService'

const initialState = {
    books: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//create new book
export const createBook = createAsyncThunk('books/create',
async (bookData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await bookService.createBook(bookData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get user goals
export const getUserBooks = createAsyncThunk('books/getAll', 
async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await bookService.getUserBooks(token)
    }  catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBook.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createBook.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.books.push(action.payload)
            })
            .addCase(createBook.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getUserBooks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserBooks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.books = action.payload.message
            })
            .addCase(getUserBooks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            
    }
})

export const { reset } = bookSlice.actions

export default bookSlice.reducer

