/*
 * The `Wishlist` component displays the user's wishlist, allowing them to view and manage their desired products.
 *
 * Core Functionality:
 * - Fetches wishlist product data from the backend and displays it to the user.
 * - Users can remove items from their wishlist and add them to the cart.
 *
 * Features:
 * - Utilizes Material-UI components for consistent and appealing visual design.
 * - Implements a responsive layout using Grid and Container components.
 * - Displays product images, names, and prices with an option to add to cart.
 * - Provides an option to remove items from the wishlist.
 * - Offers navigation to other pages through the Navbar component.
 *
 * Notes:
 * - Wishlist items are fetched from the server and stored in local state for rendering.
 * - Wishlist products can be added to the cart, which triggers a database update and navigation to the cart page.
 * - User interface includes typography, buttons, and icons consistent with the overall application design.
 */

import { Remove as RemoveIcon } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, IconButton, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { HOSTED_BASE_URL } from "../../constants";

/*
 * The `theme` configuration defines the visual styling for the application using Material-UI's `createTheme`.
 *
 * Core Styling:
 * - Defines primary and secondary color palettes for consistent theming.
 * - Sets the primary color to "#000000" (black) and secondary color to "#ff4081" (pink).
 * - Additional theme configurations can be added for other styling elements.
 *
 * Typography:
 * - Sets the default font family for the entire application to "Arial, sans-serif".
 * - This font family will be applied to text elements across the app.
 *
 * Usage:
 * - This theme can be applied to Material-UI components and other styled elements throughout the app.
 * - Provides a consistent and visually appealing design across different UI components.
 */
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
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  /*
  * The `useEffect` hook fetches wishlist products from the server and updates the local state.
  *
  * Core Functionality:
  * - Executes once after the component is mounted.
  * - Makes an API request to fetch wishlist products from the backend.
  * - Handles successful and unsuccessful network responses.
  * - Updates the local state with the fetched wishlist products.
  *
  * Dependencies:
  * - Relies on the `HOSTED_BASE_URL` constant for forming the API endpoint.
  *
  * Usage:
  * - Initializes the wishlist products when the component is first rendered.
  * - Handles any errors that occur during fetching and updates the state accordingly.
  */
  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const response = await fetch(HOSTED_BASE_URL + '/product/fetch_wishlist_db', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const wishlistData = await response.json();
        setWishlistProducts(wishlistData);
      } catch (error) {
        console.error('Error fetching wishlist products:', error);
      }
    };

    fetchWishlistProducts();
  }, []);

  /*
    * The `handleRemoveFromWishlist` function handles the removal of a product from the wishlist.
    *
    * Core Functionality:
    * - Makes an API request to remove a product from the wishlist in the backend.
    * - Updates the local state to reflect the removal of the product.
    * - Handles successful and unsuccessful network responses during removal.
    * - Logs errors that occur during the removal process.
    *
    * Parameters:
    * @param {string} productId - The unique identifier of the product to be removed.
    *
    * Usage:
    * - Invoked when a user clicks on the remove icon next to a product in the wishlist.
    * - Sends a request to the server to remove the product from the user's wishlist.
    * - Updates the local state to immediately reflect the removal for a smooth user experience.
    */
  const handleRemoveFromWishlist = async (productId) => {
    try {
      // Make an API call to remove the item from the database
      const response = await fetch(HOSTED_BASE_URL + '/product/delete_wishlist_item/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId }),
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

  /*
  * The `handleAddToCart` function handles the addition of a product to the cart.
  *
  * Core Functionality:
  * - Finds the selected product from the wishlist based on its unique identifier.
  * - Updates the local state to add the selected product to the cart.
  * - Makes an API request to save the product details to the user's cart in the backend.
  * - Navigates the user to the cart page after successfully adding the product.
  * - Handles errors during the addition process and logs them.
  *
  * Parameters:
  * @param {string} productId - The unique identifier of the product to be added to the cart.
  *
  * Usage:
  * - Invoked when a user clicks the "Add to Cart" button next to a product in the wishlist.
  * - Retrieves the selected product details from the wishlist.
  * - Updates the cart items in the local state to reflect the addition.
  * - Sends a request to the server to save the product details to the user's cart.
  * - Navigates the user to the cart page, passing relevant product details as state.
  * - Logs errors that occur during the addition process.
  */
  const handleAddToCart = async (productId) => {
    const productToAdd = wishlistProducts.find((product) => product._id === productId);
    if (productToAdd) {
      setCartItems((prevCartItems) => [...prevCartItems, productToAdd]);
      try {
        const response = await fetch(HOSTED_BASE_URL + '/product/save_cart_db', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productToAdd),
        });

        if (!response.ok) {
          throw new Error('Failed to add cart details to MongoDB');
        }
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
          <Typography variant="h4" gutterBottom sx={{ fontFamily: theme.typography, fontWeight: "bold", fontSize: "40px" }}>Wishlist</Typography>
          {wishlistProducts.length === 0 ? (
            <Typography variant="body1">Your wishlist is empty.</Typography>
          ) : (
            <>
              <br />
              <br />
              <Grid container spacing={2}>
                {wishlistProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product._id}>
                    <Card>
                      <CardMedia
                        component="img"
                        src={product.image_url}
                        alt={product.name}
                        sx={{ height: 300, objectFit: 'contain', fontFamily: theme.typography.fontFamily, fontWeight: "bold" }}
                      />
                      <CardContent >
                        <Typography variant="h6" sx={{ fontFamily: theme.typography.fontFamily }}>{product.name}</Typography>
                        <Typography variant="body1" sx={{ fontFamily: theme.typography.fontFamily, fontWeight: "bold" }}>Price: ${product.price}</Typography>
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