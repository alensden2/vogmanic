/*
 * The `ProductListingPage` component displays a list of products to the user, along with search and filtering options.
 *
 * Core Functionality:
 * - Fetches product data from the backend and displays it based on the selected tab (`new` or `resell`).
 * - Allows users to search for products using a search bar.
 * - Enables filtering of products by category using a sidebar drawer.
 * - Users can add products to their cart or wishlist.
 *
 * Features:
 * - Dynamic rendering of products based on the selected tab (new/resell).
 * - Utilizes Material-UI components for a visually appealing and responsive design.
 * - Implements a drawer for selecting product categories, enhancing user experience.
 * - Handles adding products to the cart and wishlist, updating their states, and sending requests to the server.
 * - Displays product details, ratings, prices, and icons for cart and wishlist interactions.
 * - Offers navigation to different pages such as the cart and wishlist.
 */
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Favorite, FavoriteBorder, Search, ShoppingCart, Star } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Drawer, Grid, IconButton, List, ListItem, ListItemText, Tab, Tabs, TextField, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { HOSTED_BASE_URL } from "../../constants";

const drawerWidth = 240;

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
    fontFamily: "Neue-Helvetica,Helvetica,Arial,sans-serif"
  },
});

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [resellProducts, setResellProducts] = useState([]);
  const [currentTab, setCurrentTab] = useState('new');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  const cartItemCount = cartItems.length;
  const email = localStorage.getItem("userEmail");

  /*
  * The `useEffect` hook fetches product data from the backend API when the component mounts.
  * It retrieves both regular products and resell products.
  * The fetched data is used to populate the `products` and `resellProducts` states.
  * Additionally, unique categories are extracted from the product data and stored in the `categories` state for filtering.
  *
  * Core Functionality:
  * - Fetches regular products using a POST request to the '/product/products' endpoint.
  * - Fetches resell products using a GET request to the '/resale/getAll' endpoint.
  * - Handles successful responses by updating the respective state arrays.
  * - Handles errors and logs any failures to fetch resell products.
  *
  * Note: The hook runs only once when the component mounts due to the empty dependency array `[]`.
  */
  useEffect(() => {
    // Function to fetch products from the backend
    const fetchProducts = async () => {
      // try {
      const response = await fetch(HOSTED_BASE_URL + '/product/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const productsData = await response.json();
      setProducts(productsData);

      const uniqueCategories = [...new Set(productsData.map(product => product.category))];
      setCategories(uniqueCategories);
    };

    /** 
     * Fetch regular products and resell products from the backend API when the component mounts.
     * Regular products are fetched using the '/product/products' endpoint,
     * while resell products are fetched using the '/resale/getAll' endpoint.
     * The fetched data is used to populate the respective state arrays: 'products' and 'resellProducts'.
     * This provides the necessary data for rendering product listings on the page.
     */
    const fetchResellProducts = async () => {
      const response = await fetch(
        HOSTED_BASE_URL + '/resale/getAll',
        {
          headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
          },
        }
      );
      if (response.ok) {
        const resellProductsData = await response.json();
        setResellProducts(resellProductsData);
      } else {
        console.error('Failed to fetch resell products');
      }
    };
    fetchProducts();
    fetchResellProducts();
  }, []);

  /**
   * Function to handle adding a product to the cart.
   * If the current tab is 'new', the product is searched for in the 'products' array.
   * If the current tab is 'resell', the product is searched for in the 'resellProducts' array.
   * Once the product is found, its details are added to the 'cartItems' state array.
   * The product details are also sent to the backend to be saved in the user's cart in the database.
   * If the operation is successful, the user is navigated to the cart page with relevant information.
   * If there is an error, an error message is displayed.
   * @param {string} productId - The ID of the product to be added to the cart.
   */
  const handleAddToCart = async (productId) => {
    let productToAdd;
    if (currentTab === 'new') {
      productToAdd = products.find((product) => product._id === productId);
    } else {
      productToAdd = resellProducts.find((product) => product._id === productId);
    }

    if (productToAdd) {
      productToAdd.email = email;
      setCartItems((prevCartItems) => [...prevCartItems, productToAdd]);
      try {
        const response = await fetch(HOSTED_BASE_URL + "/product/save_cart_db", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
          },
          body: JSON.stringify(productToAdd),
        });

        if (!response.ok) {
          throw new Error('Failed to add cart details to MongoDB');
        }
        navigate("/cart", {
          state: {
            productId: productToAdd._id + email,
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

  /**
   * Function to handle adding or removing a product from the wishlist.
   * If the product with the given ID is already in the wishlist, it is removed.
   * If the product is not in the wishlist, it is added.
   * The function first checks if the product is already in the wishlist by searching the 'wishlistItems' array.
   * If the product is in the wishlist, it is removed from the array and the 'wishlistItems' state is updated.
   * If the product is not in the wishlist, it is added to the array and the 'wishlistItems' state is updated.
   * An API request is then made to save the wishlist data to the database.
   * If the operation is successful, the wishlist is updated.
   * If there is an error, an error message is displayed.
   * @param {string} productId - The ID of the product to be added or removed from the wishlist.
   */
  const handleAddToWishlist = async (productId) => {
    const productInList = wishlistItems.find((product) => product._id === productId);
    if (productInList) {
      const filteredArray = wishlistItems.filter(item => item._id !== productId);
      setWishlistItems(filteredArray);
      return;
    }
    let productToAdd;
    if (currentTab === 'new') {
      productToAdd = products.find((product) => product._id === productId);
    } else {
      productToAdd = resellProducts.find((product) => product._id === productId);
    }
    if (productToAdd) {
      setWishlistItems((prevCartItems) => [...prevCartItems, productToAdd]);
      try {
        const response = await fetch(HOSTED_BASE_URL + '/product/save_wishlist_db', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
          },
          body: JSON.stringify(productToAdd),
        });

        if (!response.ok) {
          throw new Error('Failed to add cart details to MongoDB');
        }
      }
      catch (error) {
        console.error('Error adding wishlist details to MongoDB:', cartItemCount, error);
      }
    }
  };

  /**
   * Function to handle changes in the search input field.
   * Updates the 'searchTerm' state with the new value entered by the user.
   * @param {Object} event - The event object generated by the input change.
   */
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Filters the list of products based on the selected category and search term.
   * If no category is selected, all products are returned.
   * If a category is selected, only products belonging to that category are returned.
   * The list is then further filtered based on whether the product name includes the search term (case-insensitive).
   * @returns {Array} - The array of filtered products.
   */
  const filteredProducts = products.filter((product) => {
    if (!selectedCategory) {
      return true;
    }
    return product.category === selectedCategory;
  }).filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  /**
   * Function to handle the selection of a category.
   * Updates the 'selectedCategory' state with the chosen category and closes the drawer.
   * @param {string} category - The category selected by the user.
   */
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDrawerOpen(false);
  };

  /**
   * Function to toggle the state of the drawer (open/close).
   */
  const handleDrawerToggle = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  /**
   * Function to close the drawer.
   */
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  /**
   * Checks if a product with the given productId is present in the wishlist.
   * @param {string} productId - The ID of the product to check.
   * @returns {Object|null} - The product if found in the wishlist, otherwise null.
   */
  const isInWishlist = (productId) => {
    const productToAdd = wishlistItems.find((product) => product._id === productId);
    wishlistItems.includes(productToAdd);
    return productToAdd;
  }
  // Determine which set of products to render based on the current tab
  const productsToRender = currentTab === 'new' ? filteredProducts : resellProducts;
  return (
    <Box>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Tabs
          value={currentTab}
          onChange={(e, newValue) => setCurrentTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          style={{ margin: '5rem', marginBottom: '0px' }}
        >
          <Tab label="New Products" value="new" />
          <Tab label="Resell Products" value="resell" />
        </Tabs>

        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              marginTop: '0px',
              position: "absolute",
              zIndex: 1000,
              width: drawerWidth,
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Drawer
              variant="persistent"
              anchor="left"
              open={isDrawerOpen}
              sx={{
                width: '250px',
                flexShrink: 0,
              }}
            >
              <Box sx={{
                width: drawerWidth,
                paddingTop: '82px',
                flexShrink: 0,
                backgroundColor: '#f4f4f4',
                padding: '16px',
                borderRight: '1px solid #ccc',
              }}>
                <Typography variant="h6" sx={{
                  paddingTop: '82px', marginBottom: '16px', fontWeight: 500,
                  color: theme.palette.primary.main,
                  fontSize: "24px",
                  fontFamily: theme.typography.fontFamily
                }}>
                  Categories
                </Typography>
              </Box>
              <List>
                {categories.map((category) => (
                  <ListItem
                    key={category}
                    button
                    selected={selectedCategory === category}
                    onClick={() => handleCategorySelect(category)}
                  >
                    <ListItemText primary={<Typography variant="body1" sx={{ fontFamily: theme.typography.fontFamily }}>{category}</Typography>} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </Box>
          <Box sx={{ maxWidth: "1200px", margin: "0 auto", paddingTop: '82px', paddingX: '64px' }}>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "16px", backgroundColor: "#fff", padding: "8px", borderRadius: "4px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              <Search sx={{ marginRight: "8px", color: "#666", fontSize: "24px" }} />
              <TextField
                label="Search Products"
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
                variant="standard"
                InputProps={{
                  sx: {
                    backgroundColor: "#f9f9f9",
                    borderRadius: "4px",
                    padding: "2px 8px",
                    boxShadow: "none",
                    "& .MuiInputBase-input": {
                      fontSize: "14px",
                      color: "#000",
                      fontWeight: 500,
                      fontFamily: theme.typography.fontFamily
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "14px",
                      color: searchTerm ? "#777" : "#999", // Placeholder text color (gray when empty, light gray when focused)
                    },
                  },
                }}
                InputLabelProps={{
                  shrink: true, // Keep the label from floating when focused
                }}
              />
            </Box>
            <Grid
              container
              spacing={3}
              justifyContent="center"
              sx={{ paddingTop: "16px", minWidth: "900px" }}
            >
              {productsToRender.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "16px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      borderRadius: "4px",
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={product.image_url}
                        alt={product.name}
                        sx={{
                          height: "300px",
                          objectFit: "cover",
                          borderTopLeftRadius: "4px",
                          borderTopRightRadius: "4px",
                        }}
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          bottom: "8px",
                          right: "8px",
                          display: "flex",
                          color: isInWishlist(product._id) ? "red" : theme.palette.primary.main.light,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          handleAddToWishlist(product._id);
                        }}
                      >
                        {
                          isInWishlist(product._id) ?
                            <Favorite sx={{ fontSize: "35px" }} />
                            :
                            <FavoriteBorder sx={{ fontSize: "35px" }} />
                        }
                      </IconButton>
                    </Box>
                    <CardContent sx={{ flex: "1", paddingBottom: "8px" }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          marginBottom: "8px",
                          color: theme.palette.primary.main,
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "8px",
                          color: theme.palette.secondary.main,
                        }}
                      >
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            color={index < product.rating ? "primary" : "disabled"}
                          />
                        ))}
                      </Box>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "5px",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "16px",
                            backgroundColor: 'beige', // Background color for the price section
                            color: "black", // Text color for the price section
                            padding: "8px 12px", // Add some padding
                            borderRadius: "4px", // Add border-radius for rounded corners
                            fontSize: "20px", // Adjust font size
                            fontWeight: "bold",
                          }}
                        >
                          ${product.price}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton
                          sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: "beige",
                            "&:hover": {
                              backgroundColor: theme.palette.primary,
                            },
                          }}
                          onClick={() => handleAddToCart(product._id)}
                        >
                          <ShoppingCart />
                        </IconButton>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <IconButton
            sx={{
              position: 'fixed',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
            }}
            onClick={isDrawerOpen ? handleDrawerClose : handleDrawerToggle}
          >
            {isDrawerOpen ? (
              <ChevronLeftIcon sx={{ fontSize: "32px" }} />
            ) : (
              <ChevronRightIcon sx={{ fontSize: "32px" }} />
            )}
          </IconButton>
        </Box>
      </ThemeProvider>
      <Footer sx={{ flexShrink: 0 }} />
    </Box>
  );
}

export default ProductListingPage;