import React, { useState, useEffect } from 'react';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        const createdBook = await response.json();
        setBooks((prevBooks) => [...prevBooks, createdBook]);
        setNewBook({ title: '', author: '', description: '' });
      } else {
        console.error('Failed to add book:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div>
      <h1>Books List</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={newBook.title} onChange={handleInputChange} />
        </label>
        <label>
          Author:
          <input type="text" name="author" value={newBook.author} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={newBook.description} onChange={handleInputChange} />
        </label>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default BooksList;
