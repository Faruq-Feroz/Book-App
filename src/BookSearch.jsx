import { useState } from 'react';
import BookCard from './BookCard ';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from 'react-icons/fa';

// Default Books by Genre
const DEFAULT_BOOKS = [
  {
    genre: 'Fantasy',
    books: [
      {
        key: '1',
        title: 'Circle',
        author: 'Madeline Miller.',
        first_publish_year: '2021',
        cover: 'https://i.pinimg.com/736x/65/54/23/655423d00c57e4b0767ca266301fbd4c.jpg',
      },
      {
        key: '2',
        title: 'The Buried Giant',
        author: 'Kazuo Ishiguro',
        first_publish_year: '2020',
        cover: 'https://i.pinimg.com/736x/c9/14/a8/c914a8ac38620a27cea4b2b8c164a636.jpg',
      },
      {
        key: '3',
        title: 'Watership Down',
        author: 'Author 3',
        first_publish_year: '2022',
        cover: 'https://i.pinimg.com/564x/bd/3a/fa/bd3afa109a975e25fd920ba104b63f65.jpg',
      },
    ],
  },
  {
    genre: 'Mystery',
    books: [
      {
        key: '4',
        title: 'My Annihilation',
        author: 'Richard Adams',
        first_publish_year: '2021',
        cover: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1689018349-81FdfnFjOUS.jpg?crop=1xw:1xh;center,top&resize=980:*',
      },
      {
        key: '5',
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
        first_publish_year: '2018',
        cover: 'https://i.pinimg.com/474x/f5/88/2e/f5882e7b55a57c88bf6da72f3eddd2f8.jpg',
      },
      {
        key: '6',
        title: 'Silent Patient',
        author: 'Alex Michaelides',
        first_publish_year: '2021',
        cover: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1689018391-91BbLCJOruL.jpg?crop=1xw:1xh;center,top&resize=980:*',
      },
    ],
  },
  {
    genre: 'Science Fiction',
    books: [
      {
        key: '7',
        title: 'The Martian',
        author: 'Andy Weir',
        first_publish_year: '2011',
        cover: 'https://i.pinimg.com/736x/88/75/40/887540d3aaec7b314ae8c8b422b11f09.jpg',
      },
      {
        key: '8',
        title: 'The Neuromancer',
        author: 'William Gibson',
        first_publish_year: '1984',
        cover: 'https://i.pinimg.com/736x/7e/1c/62/7e1c629d6d563b328af45606e0fb25be.jpg',
      },
      {
        key: '9',
        title: 'All the Birds in the Sky',
        author: 'Charlie Jane Anders',
        first_publish_year: '2016',
        cover: 'https://i.pinimg.com/736x/1b/4e/51/1b4e51f851138c2d31f8f683cb8f9521.jpg',
      },
    ],
  },
  {
    genre: 'Historical Fiction',
    books: [
      {
        key: '10',
        title: 'The Nightingale',
        author: 'St. Martin',
        first_publish_year: '2016',
        cover: 'https://i.pinimg.com/736x/7f/ac/0f/7fac0fb2da6429c5e93d7846c0662baf.jpg',
      },
      {
        key: '11',
        title: 'All the Light We Cannot See',
        author: 'Anthony Doer',
        first_publish_year: '2014',
        cover: 'https://i.pinimg.com/564x/41/05/c8/4105c8af74cc7e423517ed06331970f8.jpg',
      },
      {
        key: '12',
        title: 'Historical Fiction Book 3',
        author: 'Amor Towles',
        first_publish_year: '2016',
        cover: 'https://i.pinimg.com/564x/c0/ba/ba/c0babac1683523672b49ea6b95bdebaf.jpg',
      },
    ],
  },
];

const BookSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search Functionality
  const handleSearch = async () => {
    if (!searchQuery) {
      setFilteredBooks([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${searchQuery}`);
      const data = await response.json();
      
      const books = data.docs.map(book => ({
        key: book.key,
        title: book.title,
        author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
        first_publish_year: book.first_publish_year || 'N/A',
        cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'https://via.placeholder.com/150'
      }));

      setFilteredBooks(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      setFilteredBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-white into">Faruq Hub - BookFinder</h1>

      <div className="input-group mb-4">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      <div>
        {loading ? (
          <div className="text-center">
            <p>Loading books...</p>
          </div>
        ) : searchQuery ? (
          <>
            <h2>Search Results</h2>
            <div className="row">
              {filteredBooks.length > 0 ? (
                filteredBooks.map(book => (
                  <div className="col-md-4 mb-4" key={book.key}>
                    <BookCard book={book} />
                  </div>
                ))
              ) : (
                <p>No books found for "{searchQuery}"</p>
              )}
            </div>
          </>
        ) : (
          <>
            {DEFAULT_BOOKS.map((genreGroup, index) => (
              <div key={index} className="mb-5">
                <h2 className="text-white fw-bold">{genreGroup.genre} Books</h2> {}
                <div className="row">
                  {genreGroup.books.map(book => (
                    <div className="col-md-4 mb-4" key={book.key}>
                      <BookCard book={book} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BookSearch;
