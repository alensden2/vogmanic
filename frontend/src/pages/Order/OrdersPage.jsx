import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Card, CardContent, TextField, Divider, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

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

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:6001/order/getAll');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const orderData = await response.json();
        setOrders(orderData.orders);
        setFilteredOrders(orderData.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredOrders(orders);
      return;
    }
    const searchResults = orders.filter(order => order.orderId.includes(e.target.value));
    setFilteredOrders(searchResults);
  };

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Navbar />
        <Container maxWidth="lg" sx={{ paddingTop: '82px', paddingBottom: '32px' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", fontSize: "40px" }}>Orders</Typography>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Search Orders"
            value={searchTerm}
            onChange={handleSearch}
          />
          {filteredOrders.length === 0 ? (
            <Typography variant="body1">No orders found.</Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Order ID</b></TableCell>
                  <TableCell><b>Placed</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order._id} hover style={{ cursor: 'pointer' }} onClick={() => handleOrderClick(order._id)}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default OrdersPage;
