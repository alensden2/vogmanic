import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, Card, CardMedia, CardContent, IconButton, Divider, Select, MenuItem } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper } from '@mui/material';

const Wishlist = () => {
  const location = useLocation();
  const { productName, price } = location.state || {};
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const response = await fetch('http://localhost:6001/fetch_wishlist_db', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const wishlistData = await response.json();
        console.log(wishlistData)
        setWishlistProducts(wishlistData);
      } catch (error) {
        console.error('Error fetching wishlist products:', error);
      }
    };

  fetchWishlistProducts();
  }, []);

    const handleRemoveFromWishlist = async (productId) => {
    
        try {
            // Make an API call to remove the item from the database
            const response = await fetch('http://localhost:6001/delete_wishlist_item/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ productId}),
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            // Update the local state to remove the item from the cart
            setWishlistProducts((prevWishlistProducts) =>
              prevWishlistProducts.filter((product) => product._id !== productId)
            );
          } catch (error) {
            console.error('Error removing item from wishlist:', error);
          }
        };
  

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ paddingTop: '82px', paddingBottom: '32px' }}>
        <Typography variant="h4" gutterBottom>Wishlist</Typography>
        {wishlistProducts.length === 0 ? (
          <Typography variant="body1">Your wishlist is empty.</Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              {wishlistProducts.map((product) => (
                <Grid item xs={12} key={product._id}>
                  <Card sx={{ display: 'flex', alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      src={product.image_url}
                      alt={product.name}
                      sx={{ width: '200px', height: '200px', objectFit: 'cover',display: 'flex',flexDirection: 'column', margin: '16px', boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">Name: {product.productName}</Typography>
                        <Typography variant="body1">Price: ${product.price}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleRemoveFromWishlist(product._id)}
                        style={{ marginLeft: '8px' }}
                      >
                        Remove
                      </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'right', marginBottom: '8px' }}>
            <Typography variant="h6">Total Price: ${totalPrice}</Typography>
          </Box> */}
          <br/>
          <Box sx={{ display: 'flex', marginTop: 'auto', marginBottom: '0px' }}>
              <Button variant="contained" color="primary" size="large">
                Continue Shopping
              </Button>
            </Box>
          {/* ... continue shopping button */}
         <br/>
          </>
        )}
      </Container>
      <Footer sx={{ flexShrink: 0 }} />
    </Box>
  );
};


export default Wishlist;
