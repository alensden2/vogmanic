import { Remove as RemoveIcon } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, IconButton, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { HOSTED_BASE_URL } from "../../constants";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", 
    },
    secondary: {
      main: "#ff4081", 
    },
    // Other theme configurations...
  },
  typography: {
    fontFamily: "Arial, sans-serif", 
  },
});

const Wishlist = () => {

  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [cartItems,setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const response = await fetch(HOSTED_BASE_URL+'/product/fetch_wishlist_db', {
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
            const response = await fetch(HOSTED_BASE_URL+'/product/delete_wishlist_item/', {
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

  const handleAddToCart = async (productId) => {
    
    const productToAdd = wishlistProducts.find((product) => product._id === productId);
    // console.log(product._id)
    console.log(wishlistProducts)
    console.log(productToAdd)

    if (productToAdd) {
      setCartItems((prevCartItems) => [...prevCartItems, productToAdd]);  
      try {
        const response = await fetch(HOSTED_BASE_URL+'/product/save_cart_db', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productToAdd),
        });

        if (!response.ok) {
          throw new Error('Failed to add cart details to MongoDB');
        }    
      console.log(productToAdd)
      navigate("/cart", {
        state: {
          productId: productToAdd._id,
          productName: productToAdd.name,
          price: productToAdd.price,
        },
      });
    }
    catch (error) {
      console.error('Error adding cart details to MongoDB:', error);
    }
  }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Navbar />
        <Container maxWidth="lg" sx={{ paddingTop: '82px', paddingBottom: '32px' }}>
          <Typography variant="h4" gutterBottom sx={{ fontFamily: theme.typography, fontWeight: "bold", fontSize: "40px"}}>Wishlist</Typography>
          {wishlistProducts.length === 0 ? (
            <Typography variant="body1">Your wishlist is empty.</Typography>
          ) : (
            <>
            <br/>
            <br/>
              <Grid container spacing={2}>
                {wishlistProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product._id}>
                    <Card>
                      <CardMedia
                        component="img"
                        src={product.image_url}
                        alt={product.name}
                        sx={{ height: 300, objectFit: 'contain',fontFamily: theme.typography.fontFamily, fontWeight: "bold" }}
                      />
                      <CardContent >
                        <Typography variant="h6" sx={{fontFamily: theme.typography.fontFamily}}>{product.name}</Typography>
                        <Typography variant="body1"sx={{fontFamily: theme.typography.fontFamily, fontWeight: "bold"}}>Price: ${product.price}</Typography>
                      </CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleAddToCart(product._id)}
                        >
                          Add to cart
                        </Button>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton onClick={() => handleRemoveFromWishlist(product._id)}>
                          <RemoveIcon />
                        </IconButton>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Container>
        <Footer sx={{ flexShrink: 0 }} />
      </Box>
    </ThemeProvider>
  );
};


export default Wishlist;
