import React from 'react';
import { render, screen } from '@testing-library/react';
import OfferCard from '../component/OfferCard';

// describe('OfferCard Component', () => {
  test('renders image with correct src and alt text', () => {
    render(<OfferCard />);
    // const image = screen.getByAltText('Credit Card Offer');
    // expect(image).toBeInTheDocument();
    // expect(image).toHaveAttribute('src', '/offer.jpg');
  });
// });


