// import { render } from "@testing-library/react";
// import App from "../App";

// test("Testing App Component", () => {
//   render(<App />);
// })

import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from "../App"; // Assuming your component is named 'App'

describe('App component', () => {
  test('fetches book data from server and sets state', async () => {
    const mockBookData = [{ id: 1, title: 'Book 1' }, { id: 2, title: 'Book 2' }];
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockBookData),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Book 1')).toBeInTheDocument();
      expect(screen.getByText('Book 2')).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:9000/books');
  });

  test('saves wishList to localStorage when it changes', () => {
    const { rerender } = render(<App />);
    const mockWishList = [{ id: 1, title: 'Book 1' }, { id: 2, title: 'Book 2' }];

    fireEvent.beforeUnload(window); // trigger beforeunload event to ensure localStorage is accessible

    rerender(<App wishList={mockWishList} />);

    expect(localStorage.setItem).toHaveBeenCalledWith('wishList', JSON.stringify(mockWishList));
  });

  test('saves cartList to localStorage when it changes', () => {
    const { rerender } = render(<App />);
    const mockCartList = [{ id: 1, title: 'Book 1' }, { id: 2, title: 'Book 2' }];

    // fireEvent.beforeUnload(window); // trigger beforeunload event to ensure localStorage is accessible

    rerender(<App cartList={mockCartList} />);

    expect(localStorage.setItem).toHaveBeenCalledWith('cartList', JSON.stringify(mockCartList));
  });
});
