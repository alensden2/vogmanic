import {
  Avatar,
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Button
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import axios from 'axios';
import { HOSTED_BASE_URL } from "../../constants";

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

  const handleProductClick = (productId) => {
    navigate(`/resale/${productId}`);
  };

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
