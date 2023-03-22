import {useLayoutEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import BookForm from '../components/bookForm'
import BookItem from '../components/BookItem'
import Spinner from '../components/Spinner'
import { getUserBooks} from '../features/books/bookSlice'
import {reset} from '../features/auth/authSlice'



function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { books, isLoading, isError, message } = useSelector((state) => state.books)

    useLayoutEffect(() => {
        if (!user) {
            navigate("/login")
        }

        if (isError) {
            console.log(message)

        }

        dispatch(getUserBooks())

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
    <>
        <section className="heading">
            <h1>Welcome {user && user.name}</h1>
            <p>Book Shelf Dashboard</p>
        </section>

        <BookForm />
        <section className="content">
            {books.length > 0 ? (
            <div className="goals">
                {books.map((book) => {
                    return <BookItem key={book._id} book={book} />
                })}
            </div>) : (<h3> you have not added any books</h3>)}
        </section>
    </>
    )
}

export default Dashboard