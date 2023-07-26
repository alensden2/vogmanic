import React from 'react';
import { Typography, Grid, useTheme, useMediaQuery } from '@mui/material';
import ProductCard from './ProductCard';

const AccessPanel = () => {
  // Replace these with actual user data if needed
  const cartItems = [
    { id: 1, name: 'Item 1', price: 10.99, description: 'This is a dummy product.', image: 'https://dummyimage.com/200x150/ccc/000' },
  ];
  const wishlistItems = [
    { id: 3, name: 'Item 3', price: 15.99, description: 'Yet another dummy product.', image: 'https://dummyimage.com/200x150/ddd/000' },
  ];
  const recentOrders = [
    {
      id: 1,
      date: '2023-07-22',
      total: 50.25,
      items: [
        { id: 1, name: 'Item 1', price: 10.99, description: 'This is a dummy product.', image: 'https://dummyimage.com/200x150/ccc/000' },
      ],
    },
    // Add more orders as needed
  ];

  const receipts = [
    {
      id: 1,
      date: '2023-07-22',
      total: 50.25,
      items: [
        { id: 1, name: 'Item 1', price: 10.99, description: 'This is a dummy product.' },
        // Add more receipt items as needed
      ],
    },
    // Add more receipts as needed
  ];

  const handleViewCart = () => {
    // Implement the logic to navigate to the shopping cart page
    // For demonstration purposes, we'll show an alert here
    window.alert('Navigating to the shopping cart...');
  };
  
  const cardStyles = {
    marginBottom: "3vh",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: '#FFFFFF', // Set beige color for cards
    color: '#000000', // Set black color for text
  };

  // Calculate the maximum height among the cards with content
  const maxCardContentHeight = 120; // Adjust this value to fit the cards within the dimensions 1280x720


  // Use media query to check for smaller screens
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  // Limit the number of items shown in wishlist and recent orders
  const maxItemsToShow = 3;

  return (
    <div style={{  width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Use responsive grid system */}
      <Grid container spacing={2} style={{ height: '100%', width: '100%' }}>
        {isSmallScreen ? (
          <>
            <Grid item xs={12} style={{ display: 'flex', marginBottom: '10px' }}>
              <ProductCard product={{ name: 'Shopping Cart', price: 0, description: 'Your shopping cart.', image: 'https://dummyimage.com/200x150/ddd/000' }} />
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', marginBottom: '10px' }}>
              <ProductCard product={{ name: 'Wishlist', price: 0, description: 'Your wishlist.', image: 'https://dummyimage.com/200x150/ddd/000' }} />
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', marginBottom: '10px' }}>
              <ProductCard product={{ name: 'Recent Orders', price: 0, description: 'Your recent orders.', image: 'https://dummyimage.com/200x150/ddd/000' }} />
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', marginBottom: '10px' }}>
              {receipts.slice(0, maxItemsToShow).map((receipt) => (
                <ProductCard key={receipt.id} product={{ name: 'Receipts', price: 0, description: 'Your receipts.' }} />
              ))}
              {receipts.length > maxItemsToShow && (
                <ProductCard noContent />
              )}
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} md={6} style={{ display: 'flex', marginBottom: '10px' }}>
              <ProductCard product={{ name: 'Shopping Cart', price: 0, description: 'Your shopping cart.', image: 'https://dummyimage.com/200x150/ddd/000' }} />
            </Grid>
            <Grid item xs={12} md={6} style={{ display: 'flex', marginBottom: '10px' }}>
              <ProductCard product={{ name: 'Wishlist', price: 0, description: 'Your wishlist.', image: 'https://dummyimage.com/200x150/ddd/000' }} />
            </Grid>
            <Grid item xs={12} md={6} style={{ display: 'flex', marginBottom: '10px' }}>
              <ProductCard product={{ name: 'Recent Orders', price: 0, description: 'Your recent orders.', image: 'https://dummyimage.com/200x150/ddd/000' }} />
            </Grid>
            <Grid item xs={12} md={6} style={{ display: 'flex', marginBottom: '10px' }}>
              {receipts.slice(0, maxItemsToShow).map((receipt) => (
                <ProductCard key={receipt.id} product={{ name: 'Receipts', price: 0, description: 'Your receipts.' }} />
              ))}
              {receipts.length > maxItemsToShow && (
                <ProductCard noContent />
              )}
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default AccessPanel;