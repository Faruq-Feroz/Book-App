const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <img src={book.cover} alt={book.title} className="card-img-top" />
      <div className="card bg-light"> {/* Added bg-light class for grey background */}
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">{book.author}</p>
          <p className="card-text">
            <small className="text-muted">Published: {book.first_publish_year}</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
