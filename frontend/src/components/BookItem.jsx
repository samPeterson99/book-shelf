function BookItem({book}) {
    return (
        <div className="goal">
            <div>
                {new Date(book.createdAt).toLocaleString('en-US')}
                <h2>{book.text}</h2>
            </div>
        </div>
    )
}

export default BookItem