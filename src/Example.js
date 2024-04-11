import React, { useState, useEffect } from 'react';

const Example = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/get'); 
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Books List</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <img src={book.cover_image} alt={book.title} style={{ maxWidth: '200px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Example;
