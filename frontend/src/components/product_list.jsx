import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Favorite, Search, ShoppingCart, Star } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Drawer, Grid, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff", // Your primary color here
      dark: "#0056b3", // Your primary dark color here (for hover effect)
    },
    secondary: {
      main: "#ff4081", // Your secondary color here
      dark: "#c60055", // Your secondary dark color here (for hover effect)
    },
    // Add more customizations as needed...
  },
});

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    // Function to fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://voguemanic-be.onrender.com/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const productsData = await response.json();
        // console.log(data)
        // const productsData = data.products;
        setProducts(productsData);

        const uniqueCategories = [...new Set(productsData.map(product => product.category))];
        console.log(uniqueCategories)
        setCategories(uniqueCategories);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Call the fetchProducts function to retrieve products
    fetchProducts();
  }, []);

  const handleAddToCart = (productId) => {
    // Implement logic to add the product to the cart
    const productToAdd = products.find((product) => product._id === productId);

    if (productToAdd) {
      // Add the product to the cartItems state
      setCartItems((prevCartItems) => [...prevCartItems, productToAdd]);
      console.log(productToAdd)
      navigate("/cart");
    }
  };

  const handleAddToWishlist = (productId) => {
    // Implement logic to add the product to the wishlist
    console.log(`Adding product with ID ${productId} to wishlist`);
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
    setSearchTerm('');
    setIsDrawerOpen(false); // Reset the search term when a category is selected
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>

    <Box sx={{ display: 'flex' }}>
        {/* Sidebar with categories */}
        <Box
          sx={{
            marginTop: 'px', // Add margin to create space below the search bar
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
          <Typography variant="h6" sx={{ paddingTop: '82px',marginBottom: '16px', fontWeight: 500 }}>
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
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Drawer>   
        </Box> 

      <Box sx={{ maxWidth: "1200px", margin: "0 auto", paddingTop: '82px', paddingX: '64px' }}>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "16px", backgroundColor: "#fff", padding: "8px", borderRadius: "4px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Search sx={{ marginRight: "8px", color: "#007bff", fontSize: "24px" }} />
          <TextField
            label="Search Products"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            variant="standard"
            InputProps={{
              sx: { backgroundColor: "#fff", borderRadius: "4px", padding: "2px 8px", boxShadow: "none" }, // Set background color for the input field
            }}
          />
        </Box>
        <Grid container spacing={3} justifyContent="center" sx={{ paddingTop: '16px' }}>
          {filteredProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', marginBottom: '16px', boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image_url}
                  alt={product.name}
                  sx={{
                    height: '200%',
                    objectFit: 'cover', // Use 'cover' to scale the image while preserving aspect ratio
                  }}
                />
                <CardContent>
                  <Typography variant="h5">{product.name}</Typography>
                  <Typography variant="body1">{product.description}</Typography>
                  <Typography variant="body2">Price: ${product.price}</Typography>
                  <Typography variant="body2">Shipping Cost: ${product.shipping_cost}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} color={index < product.rating ? "primary" : "disabled"} />
                    ))}
                  </Box>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
                  <IconButton sx={{ backgroundColor: theme => theme.palette.primary.main, color: "#fff", "&:hover": { backgroundColor: theme => theme.palette.primary.dark } }} onClick={() => handleAddToCart(product._id)}>
                    <ShoppingCart />
                  </IconButton>
                  <IconButton sx={{ backgroundColor: theme => theme.palette.secondary.main, color: "#fff", "&:hover": { backgroundColor: theme => theme.palette.secondary.dark } }} onClick={() => handleAddToWishlist(product._id)}>
                    <Favorite />
                  </IconButton>
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
          onClick={handleDrawerToggle}
        >
          {isDrawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
    </ThemeProvider>
  );
}

export default ProductList;
