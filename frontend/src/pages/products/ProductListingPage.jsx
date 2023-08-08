import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Favorite, FavoriteBorder, Search, ShoppingCart, Star } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Drawer, Grid, IconButton, List, ListItem, ListItemText, TextField, Typography, Tabs, Tab } from "@mui/material";
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
      console.log(uniqueCategories)
      setCategories(uniqueCategories);
    };

    // Function to fetch resell products
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


    // Call the fetchProducts function to retrieve products
    fetchProducts();
    fetchResellProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    let productToAdd;
    if (currentTab === 'new') {
      productToAdd = products.find((product) => product._id === productId);
    } else {
      productToAdd = resellProducts.find((product) => product._id === productId);
    }

    if (productToAdd) {
      console.log("adding product");
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
        console.log(productToAdd)
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

  const handleAddToWishlist = async (productId) => {
    const productInList = wishlistItems.find((product) => product._id === productId);

    console.log("Product In: ", productInList);

    if (productInList) {
      const filteredArray = wishlistItems.filter(item => item._id !== productId);
      console.log("Filtered Items:", filteredArray);
      setWishlistItems(filteredArray);
      return;
    }


    // Implement logic to add the product to the wishlist
    let productToAdd;
    if (currentTab === 'new') {
      productToAdd = products.find((product) => product._id === productId);
    } else {
      productToAdd = resellProducts.find((product) => product._id === productId);
    }
    // const productToAdd = products.find((product) => product._id === productId);

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
        console.log(productToAdd)
      }
      catch (error) {
        console.error('Error adding wishlist details to MongoDB:', cartItemCount, error);
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    // If no category is selected, show all products
    if (!selectedCategory) {
      return true;
    }

    return product.category === selectedCategory;
  }).filter((product) => {
    // Filter the products whose name contains the search term
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });


  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    //setSearchTerm('');
    setIsDrawerOpen(false); // Reset the search term when a category is selected
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prev) => !prev);
  };
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const isInWishlist = (productId) => {
    const productToAdd = wishlistItems.find((product) => product._id === productId);
    wishlistItems.includes(productToAdd);
    return productToAdd;
  }

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
          {/* Sidebar with categories */}
          <Box
            sx={{
              marginTop: '0px',
              position: "absolute",
              zIndex: 1000,
              width: drawerWidth, // Set the width of the drawer
              backgroundColor: "#f9f9f9", // Zara's drawer background color
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Add a box shadow
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
                backgroundColor: '#f4f4f4', // Set background color for the sidebar
                padding: '16px', // Add some padding
                borderRight: '1px solid #ccc', // Add a border to separate categories from the content
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
                {/* Render the categories in the sidebar */}
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
              {/* Search bar resembling Zara */}
              <Search sx={{ marginRight: "8px", color: "#666", fontSize: "24px" }} />
              <TextField
                label="Search Products"
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
                variant="standard"
                InputProps={{
                  sx: {
                    backgroundColor: "#f9f9f9", // Zara's search bar background color
                    borderRadius: "4px",
                    padding: "2px 8px",
                    boxShadow: "none",
                    "& .MuiInputBase-input": {
                      fontSize: "14px",
                      color: "#000", // Zara's text color
                      fontWeight: 500,
                      fontFamily: theme.typography.fontFamily // Use a custom font similar to Zara's font
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
                          objectFit: "cover", // Use 'contain' to fit the image inside the card
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
                      {/* <Typography variant="body2">{product.description}</Typography> */}
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
