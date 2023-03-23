import {useDispatch} from 'react-redux'
import {deleteBook} from '../features/books/bookSlice'

function BookItem({book}) {
    const dispatch = useDispatch()

    return (
        <div className="goal">
            <div>
                {new Date(book.createdAt).toLocaleString('en-US')}
                <h2>{book.text}</h2>
                <button onClick={() => {dispatch(deleteBook(book._id))}} className="close">X</button>
            </div>
        </div>
    )
}

export default BookItem