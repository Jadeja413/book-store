import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { SignIn } from '../component/Cards/signin/SignIn';
// import { SignIn } from '../component/SignIn';

describe('SignIn component', () => {
  test('renders correctly', () => {
    render(<SignIn />);

    const checkToggleBtn = screen.getByTestId('checkToggle');
    expect(checkToggleBtn).toBeInTheDocument();

  });
});
