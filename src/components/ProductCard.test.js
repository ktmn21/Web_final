// ProductCard.test.js

// Mocking react-router-dom's Link component
jest.mock('react-router-dom', () => ({
    Link: 'a' // Mocking Link as an anchor tag
}));

import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

const mockProduct = {
    id: 1,
    title: 'Product 1',
    price: 100,
    thumbnail: 'http://example.com/product1.jpg'
};

test('renders product title', () => {
    render(<ProductCard product={mockProduct} />);

    // Assert that the product title appears in the document
    expect(screen.getByText('Product 1')).toBeInTheDocument();
});

test('renders product price', () => {
    render(<ProductCard product={mockProduct} />);

    // Assert that the product price appears in the document
    expect(screen.getByText('$100')).toBeInTheDocument();
});
