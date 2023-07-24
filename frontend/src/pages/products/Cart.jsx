import React, { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, Card, CardMedia, CardContent, IconButton, Divider, Select, MenuItem } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const Cart = () => {
  const location = useLocation();
  const { productName, price } = location.state || {};
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();
  
  const totalPrice = cartProducts.reduce((total, product) => total + product.price * product.count, 0);
  const shippingCost = cartProducts.reduce((total, product) => total + (product.shipping_cost || 0) * product.count, 0);
  const totalCost = totalPrice + shippingCost;

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await fetch('http://localhost:6001/fetch_cart_db', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const cartData = await response.json();
        console.log(cartData)
        setCartProducts(cartData);
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };

  fetchCartProducts();
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    try{
        setCartProducts((prevCartProducts) =>
          prevCartProducts.map((product) =>
            product._id === productId ? { ...product, count: newQuantity } : product
          )
          
        );
        console.log(newQuantity);
        const response = await fetch('http://localhost:6001/update_qty_db', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId, newQuantity }),
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const updatedProduct = await response.json();
        console.log('Quantity updated in the database:', updatedProduct);
      } catch (error) {
        console.error('Error updating quantity:', error);
        // You may want to revert the local state if the API call fails
      }
    };

    const handleRemoveFromCart = async (productId) => {
      try {
        // Make an API call to remove the item from the database
        const response = await fetch('http://localhost:6001/delete_cart_item/', {
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
        setCartProducts((prevCartProducts) =>
          prevCartProducts.filter((product) => product._id !== productId)
        );
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    };

    const handleContinueShopping = () => {
     navigate("/products")
    };
  
    const handleProceedToCheckout = () => {
     console.log(cartProducts)
      navigate("/checkout", {
        state: {
          cartProducts: cartProducts,
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
              {/* ... (Table and TableRow code) */}
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
