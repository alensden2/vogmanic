/*
 * This page component, OrdersPage, serves as a user interface to display and manage orders for a customer.
 * It retrieves order information from the server and provides search functionality to find specific orders.
 * The page includes a responsive table that lists order details, such as the order ID and placement date.
 * Users can click on an order to navigate to a detailed view of that specific order.
 *
 * The page design is enhanced with a themed color palette, custom fonts, and a search input field.
 * It utilizes Material-UI components for consistent styling and responsive layout.
 * The user's access token and email are used for authentication and fetching order data.
 * Upon successful authentication, the page fetches and displays the user's orders.
 *
 * Key Features:
 * - Fetches and displays user orders from the server using a provided access token and email.
 * - Enables users to search for specific orders by order ID.
 * - Presents order information in a responsive table format with clickable rows.
 * - Navigates to a detailed order view upon clicking an order.
 *
 * Resources Used:
 * - Material-UI components and theming for styling and layout: https://mui.com/
 * - Axios library for making HTTP requests: https://axios-http.com/
 * - Custom theming for primary and secondary colors, typography, and spacing.
 */
import { Box, Container, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { HOSTED_BASE_URL } from '../../constants';

/*
 * The `theme` object is configured using the `createTheme` function from Material-UI.
 * It defines the visual styling and typography preferences for the OrdersPage component.
 * The theme includes primary and secondary color palettes, along with typography settings.
 *
 * Key Theme Customizations:
 * - Primary Color: Set to a deep black (#000000) for main components and elements.
 * - Secondary Color: Chosen as a vibrant pink (#ff4081) for accents and secondary elements.
 * - Typography: The font family is set to Arial and sans-serif for consistent text rendering.
 *
 * These customizations enhance the visual aesthetics and maintain design consistency
 * throughout the OrdersPage, providing a unified and appealing user experience.
 *
 * Resources Used:
 * - Material-UI's `createTheme` function: https://mui.com/customization/theming/
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

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  /*
  * The `useEffect` hook is utilized here to fetch a user's orders from the server
  * and populate the `orders` and `filteredOrders` states upon component mounting.
  * This fetch operation relies on the user's `accessToken` and `userEmail` stored in localStorage.
  *
  * Fetch Orders Flow:
  * - Retrieve the `accessToken` and `userEmail` from localStorage.
  * - Send a POST request to the server's `/order/getAll` endpoint, passing the user's email.
  * - Attach the `Authorization` header with the bearer token (access token).
  * - Upon a successful response, update both `orders` and `filteredOrders` states with the retrieved orders data.
  * - In case of an error, log an error message to the console.
  *
  * This useEffect ensures that orders are fetched and displayed when the component mounts,
  * contributing to an up-to-date and accurate list of orders for the user to interact with.
  */
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

  /*
  * The `handleSearch` function is responsible for updating the search term state (`searchTerm`)
  * and filtering the list of orders based on the entered search query.
  *
  * Search Functionality:
  * - When a user types in the search input, this function is triggered.
  * - It updates the `searchTerm` state with the current value of the input.
  * - If the search query is empty, it resets the filtered orders to the complete orders list.
  * - Otherwise, it filters the orders based on whether their order ID includes the search query.
  * - The filtered orders are then updated in the `filteredOrders` state for display.
  *
  * This function enhances user experience by enabling efficient order searching and filtering,
  * helping users easily find specific orders based on order IDs.
  */
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