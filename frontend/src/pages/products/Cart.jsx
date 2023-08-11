/**
 * This component represents the Shopping Cart page, providing an intuitive and user-friendly interface for managing cart items.
 * Users can view, update quantities, remove items, and proceed to checkout. The page calculates total costs including shipping.
 *
 * Resources Used:
 * - Paper component from Material-UI: https://mui.com/material-ui/react-paper/
 * - Icons from Material-UI: https://mui.com/components/material-icons/
 */
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardMedia, Container, Divider, Grid, IconButton, MenuItem, Paper, Select, TableContainer, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { HOSTED_BASE_URL } from "../../constants";
/**
 * Define a custom Material-UI theme for styling the Cart page
 */
const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", 
    },
    secondary: {
      main: "#ff4081", 
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", 
  },
});

const Cart = () => {
  const email=localStorage.getItem("userEmail");
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();
  const totalPrice = cartProducts.reduce((total, product) => total + product.price * product.count, 0);
  const shippingCost = cartProducts.reduce((total, product) => total + (product.shipping_cost || 0) * product.count, 0);
  const totalCost = totalPrice + shippingCost;

  /*
    * The `useEffect` hook is utilized to fetch cart products from the server and update the local state.
    *
    * Cart Products Fetching:
    * - When the component mounts, this effect is triggered due to the empty dependency array.
    * - An asynchronous function `fetchCartProducts` is defined to fetch cart data.
    * - A network request is made to the server's `/product/fetch_cart_db` endpoint using a POST method.
    * - The request includes necessary headers such as content-type and authorization with a JWT token.
    * - The server response is checked for success, and cart data is parsed from the response.
    * - The `setCartProducts` function updates the local state with the fetched cart products.
    * - In case of an error, an error message is logged to the console for debugging.
    *
    * This effect ensures that the user's cart products are fetched and displayed correctly
    * when the `Cart` component is initially rendered.
    */
  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await fetch(HOSTED_BASE_URL+'/product/fetch_cart_db', {
          method: 'POST',
          headers: {
            "content-type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem("accessToken")
          },
          body:JSON.stringify({email:email})
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const cartData = await response.json();
        setCartProducts(cartData);
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };

  fetchCartProducts();
  }, []);

  /*
    * The `handleQuantityChange` function is responsible for updating the quantity of a cart product.
    *
    * Quantity Update:
    * - When the user changes the quantity of a cart product, this function is called.
    * - It updates the local `cartProducts` state to reflect the new quantity.
    * - It uses the `setCartProducts` function along with the `map` method to update the quantity of the specific product.
    * - The function then sends a network request to the server's `/product/update_qty_db` endpoint.
    * - The request includes the updated quantity, product ID, and user's email for authentication.
    * - The server response is checked for success, and the updated product data is parsed.
    * - If the response is not ok, an error is thrown and logged to the console.
    * - In case of an error, you might want to consider reverting the local state to the previous state.
    *
    * This function ensures that the user's cart product quantity is updated both locally and on the server,
    * enhancing the shopping experience by allowing users to modify the quantities of items in their cart.
    */
  const handleQuantityChange = async (productId, newQuantity) => {
    try{
        setCartProducts((prevCartProducts) =>
          prevCartProducts.map((product) =>
            product._id === productId ? { ...product, count: newQuantity } : product
          )
        );
        const response = await fetch(HOSTED_BASE_URL+'/product/update_qty_db', {
          method: 'POST',
          headers: {
            "content-type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem("accessToken")
          },
          body: JSON.stringify({ productId, newQuantity, email: email }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const updatedProduct = await response.json();
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    };
    /*
      * The `handleRemoveFromCart` function is responsible for removing a product from the user's cart.
      *
      * Remove from Cart:
      * - When the user clicks the remove button for a cart product, this function is triggered.
      * - It sends a network request to the server's `/product/delete_cart_item/` endpoint.
      * - The request includes the product ID and user's email for authentication.
      * - The server response is checked for success, and the product is removed from the local state.
      * - If the response is not ok, an error is thrown and logged to the console.
      *
      * This function ensures that users can easily remove items from their cart,
      * providing a smooth shopping experience by allowing them to manage their cart contents.
      */
    const handleRemoveFromCart = async (productId) => {
      try {
        const response = await fetch(HOSTED_BASE_URL+'/product/delete_cart_item/', {
          method: 'POST',
          headers: {
            "content-type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem("accessToken")
          },
          body: JSON.stringify({ productId,email: email}),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
          setCartProducts((prevCartProducts) =>
          prevCartProducts.filter((product) => product._id !== productId)
        );
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    };

    /*
      * The `handleContinueShopping` function is responsible for navigating the user to the products page.
      *
      * Continue Shopping:
      * - When the user clicks the "Continue Shopping" button, this function is triggered.
      * - It uses the `navigate` function from the `react-router-dom` package to redirect the user to the "/products" page.
      *
      * This function enhances user experience by allowing users to easily navigate back to the products page to continue shopping.
      */
    const handleContinueShopping = () => {
     navigate("/products")
    };
  
    /*
      * The `handleProceedToCheckout` function is responsible for navigating the user to the checkout page.
      *
      * Proceed to Checkout:
      * - When the user clicks the "Proceed to Checkout" button, this function is triggered.
      * - It prepares the `cartProducts` data for checkout by extracting relevant details and creating a new array.
      * - The user's email is removed from the product IDs to ensure data privacy.
      * - The function then uses the `navigate` function to redirect the user to the "/checkout" page, passing the prepared cart data as state.
      *
      * This function enhances user experience by guiding users to the checkout process with their selected products.
      */
    const handleProceedToCheckout = () => {
      const products= cartProducts.map(product=>({
          ...product,
          _id: product._id.split(localStorage.getItem("userEmail"))[0]
        }))
      navigate("/checkout", {
        state: {
          cartProducts: products,
        },
      });
    };
  

  return (
    <ThemeProvider theme={theme}>
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ paddingTop: '82px', paddingBottom: '32px' }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: theme.typography, fontWeight: "bold", fontSize: "40px"}}>Shopping Cart</Typography>
        {cartProducts.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          <>
          <br/>
          <br/>
            <Grid container spacing={2}>
              {cartProducts.map((product) => (
                <Grid item xs={12} key={product._id}>
                  <Card sx={{ display: 'flex', alignItems: 'center', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <CardMedia
                      component="img"
                      src={product.image_url}
                      alt={product.productName}
                      sx={{ width: '150px', height: '150px', objectFit: 'contain', borderRadius: '8px 0 0 8px' }}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Name: {product.name}</Typography>
                        <Typography variant="body1">Price: ${product.price}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', marginRight: '8px' }}>Quantity:</Typography>
                        <Select
                          value={product.count}
                          onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                          variant="outlined"
                          style={{ marginRight: '8px',color: theme.palette.primary }}
                          MenuProps={{ disablePortal: true }} // Prevents menu from being cut off by overflow
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map((quantity) => (
                            <MenuItem key={quantity} value={quantity}>
                              {quantity}
                            </MenuItem>
                          ))}
                        </Select>
                        <IconButton onClick={() => handleRemoveFromCart(product._id)}>
                          <RemoveIcon />
                        </IconButton>
                        <IconButton  onClick={() => handleQuantityChange(product._id, product.count + 1)}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <br/>
            <Grid container sx={{ marginBottom: "16px" }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Total Price:</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" align="right">${totalPrice.toFixed(2)}</Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ marginBottom: "16px" }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Shipping Cost:</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" align="right">${shippingCost.toFixed(2)}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ marginBottom: "16px" }} />
            <Grid container sx={{ marginBottom: "32px" }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Total Cost (including shipping):</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" align="right" sx={{ fontWeight: 'bold' }}>${totalCost.toFixed(2)}</Typography>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', marginTop: 'auto', marginBottom: '0px' }}>
              <Button variant="contained"  size="large" onClick={() => handleContinueShopping()} sx={{ fontWeight: 'bold' }}>
                Continue Shopping
              </Button>
            </Box>
            <TableContainer component={Paper} sx={{ marginLeft: 'auto', width: '30%', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            </TableContainer>
            <br/>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom : '32px' }}>
              <Button variant="contained"  size="large" onClick={() => handleProceedToCheckout()} sx={{ fontWeight: 'bold' }}>
                Proceed to checkout
              </Button>
            </Box>
          </>
        )}
      </Container>
      <Footer sx={{ flexShrink: 0 }} />
    </Box>
    </ThemeProvider>
  );
};


export default Cart;