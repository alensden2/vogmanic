/*
 * The `ResalePage` component displays a list of products available for resale or the user's own resale products.
 *
 * Core Functionality:
 * - Fetches resale product data from the backend based on whether the user wants to see their own resale products or products available for resale.
 * - Allows users to search for specific products using a search bar.
 * - Enables toggling between displaying the user's resale products and products available for resale.
 * - Navigates to a detailed view when clicking on a product.
 *
 * Features:
 * - Dynamic rendering of resale product data based on user's selection (own resale products/products for resale).
 * - Utilizes Material-UI components for responsive and visually appealing design.
 * - Handles user interactions such as searching for products and clicking on product items.
 * - Displays product names, dates added, and images in a tabular format.
 * - Provides options to switch between viewing own resale products and products available for resale.
 *
 * Dependencies:
 * - `axios` library for making API requests.
 * - `useNavigate` from 'react-router-dom' for programmatic navigation.
 *
 * Usage:
 * - Displays the user's resale products when initially loaded.
 * - Allows the user to toggle between viewing own resale products and products available for resale.
 * - Provides a search bar for filtering displayed products by name.
 * - Navigates to a detailed view when a product item is clicked.
 */
import {
  Avatar,
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { HOSTED_BASE_URL } from "../../constants";

/*
 * The `theme` object defines the visual styling and typography settings for the application using Material-UI.
 *
 * Palette:
 * - Specifies the color palette for the application, including primary and secondary colors.
 *
 * Typography:
 * - Defines the default font family for text throughout the application.
 *
 * Usage:
 * - The theme is created using the `createTheme` function from Material-UI.
 * - It provides a consistent and customizable visual style for components.
 * - The defined palette and typography settings are used in various components for styling purposes.
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

const ResalePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isResold, setIsResold] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResaleProducts();
  }, [isResold]);

  /*
    * The `fetchResaleProducts` function is responsible for fetching resale product data from the backend.
    *
    * Core Functionality:
    * - Sends a POST request to the backend API to retrieve resale product data.
    * - Uses the `accessToken` and `userEmail` from local storage for authentication and filtering.
    * - Updates the `products` and `filteredProducts` states with the fetched product data.
    *
    * Dependencies:
    * - Requires the `HOSTED_BASE_URL` constant to construct the API endpoint.
    * - Depends on the `localStorage` to retrieve the user's access token and email.
    *
    * Side Effects:
    * - Initiates an asynchronous network request to the backend API using the `axios` library.
    * - Updates the `products` and `filteredProducts` states with the fetched data.
    * - Logs an error message to the console if the API request encounters an error.
    *
    * Usage:
    * - Call this function when you need to fetch resale product data based on the user's preference.
    * - The retrieved data is used to update the product lists displayed in the component.
    */
  const fetchResaleProducts = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const userEmail = localStorage.getItem("userEmail");
    try {
      const response = await axios.post(
        `${HOSTED_BASE_URL}/resale/get`,
        { userEmail, isResold },
        {
          headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          }
        }
      );

      const productData = response.data;
      setProducts(productData);
      setFilteredProducts(productData);
    } catch (error) {
      console.error('Error fetching resale products:', error);
    }
  };

  /*
  * The `handleSearch` function manages the search functionality for filtering resale products.
  *
  * Core Functionality:
  * - Updates the `searchTerm` state based on user input from the search field.
  * - Filters the resale products based on the entered search term.
  * - Updates the `filteredProducts` state to display matching products.
  *
  * Dependencies:
  * - Depends on the `products` state containing the list of resale products.
  *
  * Side Effects:
  * - Modifies the `searchTerm` state to match the user's input.
  * - Adjusts the `filteredProducts` state to show products that match the search term.
  *
  * Usage:
  * - Call this function when the user interacts with the search input field.
  * - It updates the product list to display only items that match the search term.
  * - Provides real-time filtering of resale products based on user input.
  */
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredProducts([...products]);
      return;
    }
    const lowercaseSearchTerm = e.target.value.toLowerCase();
    const searchResults = products.filter(product =>
      product.name.toLowerCase().includes(lowercaseSearchTerm)
    );
    setFilteredProducts(searchResults);
  };

  /*
  * The `handleProductClick` function handles navigation to a detailed view of a specific resale product.
  *
  * Core Functionality:
  * - Navigates to the detailed view page for a selected resale product.
  *
  * Dependencies:
  * - Requires `navigate` from the `react-router-dom` library to handle navigation.
  *
  * Usage:
  * - Call this function when the user clicks on a resale product in the list.
  * - It directs the user to a page with detailed information about the selected product.
  */
  const handleProductClick = (productId) => {
    navigate(`/resale/${productId}`);
  };

  /*
  * The `toggleResold` function toggles the display of either user's own resale products or products available for resale.
  *
  * Core Functionality:
  * - Toggles the value of the `isResold` state, which controls the display mode of products.
  *
  * Side Effects:
  * - Modifies the `isResold` state to switch between user's own resale products and products available for resale.
  *
  * Usage:
  * - Call this function to toggle between different product display modes (user's own resale or available for resale).
  * - It updates the product list based on the selected display mode.
  */
  const toggleResold = () => {
    setIsResold(!isResold);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Navbar />
        <Container maxWidth="lg" sx={{ paddingTop: '82px', paddingBottom: '32px' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", fontSize: "40px" }}>
            {isResold ? 'Products for Resale' : 'My Resale Products'}
          </Typography>
          <Button onClick={toggleResold}>
            {isResold ? 'Show My Resale Products' : 'Show Products for Resale'}
          </Button>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Search Products"
            value={searchTerm}
            onChange={handleSearch}
          />
          {filteredProducts.length === 0 ? (
            <Typography variant="body1">No products found.</Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell><b>Product Name</b></TableCell>
                  <TableCell><b>Date Added</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product._id} hover style={{ cursor: 'pointer' }} onClick={() => handleProductClick(product._id)}>
                    <TableCell><Avatar variant="square" src={product.image_url} /></TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
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

export default ResalePage;