import React from 'react';
import { Grid, useTheme, useMediaQuery } from '@mui/material';
import ProductCard from './ProductCard';

const AccessPanel = () => {
  const receipts = [
    {  }
  ];

  // Use media query to check for smaller screens
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Limit the number of items shown in wishlist and recent orders
  const maxItemsToShow = 3;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Use responsive grid system */}
      <Grid container spacing={2} style={{ height: '100%', width: '100%' }}>
        {isSmallScreen ? (
          <>
            <Grid item xs={12} style={{ display: 'flex', marginBottom: '10px' }}>
              <ProductCard product={{ name: 'Shopping Cart' }} routeName="shopping-cart" />
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', marginBottom: '10px' }}>
              <ProductCard product={{ name: 'Wishlist' }} routeName="wishlist" />
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', marginBottom: '10px' }}>
              <ProductCard product={{ name: 'Recent Orders' }} routeName="recent-orders" />
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', marginBottom: '10px' }}>
              {receipts.slice(0, maxItemsToShow).map((receipt) => (
                <ProductCard key={receipt.id} product={{ name: 'Receipts' }} routeName="receipts" />
              ))}
              {receipts.length > maxItemsToShow && (
                <ProductCard noContent />
              )}
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} md={6} style={{ display: 'flex', marginBottom: '10px' }}>
              <ProductCard product={{ name: 'Shopping Cart' }} />
            </Grid>
            <Grid item xs={12} md={6} style={{ display: 'flex', marginBottom: '10px' }}>
              <ProductCard product={{ name: 'Wishlist' }} />
            </Grid>
            <Grid item xs={12} md={6} style={{ display: 'flex', marginBottom: '10px' }}>
              <ProductCard product={{ name: 'Recent Orders' }} />
            </Grid>
            <Grid item xs={12} md={6} style={{ display: 'flex', marginBottom: '10px' }}>
              {receipts.slice(0, maxItemsToShow).map((receipt) => (
                <ProductCard key={receipt.id} product={{ name: 'Receipts' }} />
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