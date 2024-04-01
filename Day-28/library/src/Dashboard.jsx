import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AddBook from './AddBook';
import AddAuthor from './AddAuthor';
import { getBooks } from '../api';
import '/App.css';
const Dashboard = () => {
  const history = useHistory();
  const [books, setBooks] = useState([]);
  const [addBookOpen, setAddBookOpen] = useState(false);
  const [addAuthorOpen, setAddAuthorOpen] = useState(false);

  useEffect(() => {
    getBooks().then((data) => setBooks(data));
  }, []);

  const handleAddBookClick = () => {
    setAddBookOpen(true);
  };

  const handleAddAuthorClick = () => {
    setAddAuthorOpen(true);
  };

  const handleAddBookClose = () => {
    setAddBookOpen(false);
  };

  const handleAddAuthorClose = () => {
    setAddAuthorOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleAddBookClick}>
          Add Book
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddAuthorClick} style={{ marginLeft: '20px' }}>
          Add Author
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '50%' }}>
          {books.map((book) => (
            <div key={book.id} style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>ISBN: {book.isbn}</p>
              <p>Publication Date: {book.publicationDate}</p>
            </div>
          ))}
        </div>
      </div>
      <AddBook open={addBookOpen} handleClose={handleAddBookClose} />
      <AddAuthor open={addAuthorOpen} handleClose={handleAddAuthorClose} />
    </div>
  );
};

export default Dashboard;