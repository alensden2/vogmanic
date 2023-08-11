/*
 * The `AccessPanel` component provides a responsive grid layout for displaying various access panels.
 *
 * Core Functionality:
 * - Displays access panels for shopping cart, wishlist, recent orders, and resale receipts.
 * - Utilizes a responsive grid system to adjust panel layout based on screen size.
 * - Limits the number of items shown in each panel for better user experience.
 *
 * Features:
 * - Supports different display layouts for small and medium/large screens.
 * - Uses the `ProductCard` component to render individual access panels.
 * - Handles dynamic rendering of panels and items based on screen size and data.
 * - Enhances user interaction and navigation for accessing different sections of the application.
 */
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import ProductCard from './ProductCard';

const AccessPanel = () => {
  const receipts = [
    {}
  ];

  /*
  * The following lines of code initialize responsive design settings using the MUI theme.
  *
  * - `theme` variable holds the current MUI theme, providing styling and breakpoint information.
  * - `isSmallScreen` variable uses a media query to determine if the screen size is smaller than 'sm' breakpoint.
  * - `maxItemsToShow` specifies the maximum number of items to display in various sections.
  *
  * These settings are crucial for adapting the UI layout and behavior based on the screen size.
  */
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const maxItemsToShow = 3;
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                <ProductCard key={receipt.id} product={{ name: 'Resale' }} routeName="receipts" />
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
                <ProductCard key={receipt.id} product={{ name: 'Resale' }} />
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