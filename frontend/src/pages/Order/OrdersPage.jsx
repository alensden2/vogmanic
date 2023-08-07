import { Box, Container, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { HOSTED_BASE_URL } from '../../constants';
import axios from 'axios';

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
      const accessToken = localStorage.getItem("accessToken");
      const userEmail = localStorage.getItem("userEmail");
      try {
        const response = await axios.post(
          `${HOSTED_BASE_URL}/order/getAll`,
          { userEmail },
          {
            headers: {
              "content-type": "application/json",
              "Authorization": `Bearer ${accessToken}`
            }
          }
        );

        const orderData = response.data;
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
