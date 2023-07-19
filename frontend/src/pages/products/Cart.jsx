import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, Card, CardMedia, CardContent, IconButton, Divider, Select, MenuItem } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper } from '@mui/material';



const Cart = () => {
  const location = useLocation();
  const { productName, price } = location.state || {};
  const [cartProducts, setCartProducts] = useState([]);
  
  const totalPrice = cartProducts.reduce((total, product) => total + product.price * product.count, 0);
  const shippingCost = 3.5;
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
  

  return (
<Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ paddingTop: '82px', paddingBottom: '32px' }}>
        <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
        {cartProducts.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              {cartProducts.map((product) => (
                <Grid item xs={12} key={product._id}>
                  <Card sx={{ display: 'flex', alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      src={product.image_url}
                      alt={product.productName}
                      sx={{ width: '200px', height: '200px', objectFit: 'cover',display: 'flex',flexDirection: 'column', margin: '16px', boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">Name: {product.productName}</Typography>
                        <Typography variant="body1">Price: ${product.price}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2">Quantity:</Typography>
                      <Select
                        value={product.count}
                        onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                        variant="outlined"
                        style={{ marginLeft: '8px' }}
                        MenuProps={{ disablePortal: true }} // Prevents menu from being cut off by overflow
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((quantity) => (
                          <MenuItem key={quantity} value={quantity}>
                            {quantity}
                          </MenuItem>
                        ))}
                      </Select>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleRemoveFromCart(product._id)}
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
          <TableContainer component={Paper} sx={{ marginLeft: 'auto', width: '30%'}}>
            <Table>
              <TableBody>
              <TableRow>  
                  <TableCell align="right" component="th" scope="row">Total Price:</TableCell>
                  <TableCell align="right">${totalPrice}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell  align="right" component="th" scope="row">Shipping Cost:</TableCell>
                  <TableCell align="right">${shippingCost}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell  align="right" component="th" scope="row">Total Cost (including shipping):</TableCell>
                  <TableCell align="right">${totalCost}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* ... continue shopping button */}
         <br/>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom : '32px' }}>
              <Button variant="contained" color="primary" size="large">
                Proceed to checkout
              </Button>
            </Box>
          </>
        )}
      </Container>
      <Footer sx={{ flexShrink: 0 }} />
    </Box>
  );
};


export default Cart;
