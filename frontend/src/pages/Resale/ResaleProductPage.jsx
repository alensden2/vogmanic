import {
    Avatar,
    Box,
    Button,
    Card, CardContent,
    Container,
    Divider,
    Grid,
    TextField,
    Typography,
    styled
  } from "@mui/material";
  import React, { useEffect, useState } from 'react';
  import { useNavigate, useParams } from 'react-router-dom';
  import Footer from "../../components/footer";
  import Navbar from "../../components/navbar";
  import { HOSTED_BASE_URL } from '../../constants';
  import axios from 'axios';
  
  const DetailLine = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
  }));
  
  const StyledTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#FF4081',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#FF4081',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#FF4081',
      },
    },
  });

  const StyledCardContent = styled(CardContent)(({ theme }) => ({
    backgroundColor: '#FFFFFF',
    borderRadius: '4px',
    padding: theme.spacing(2),
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  }));
  
  const ResaleProductPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState(null);
    const [editFields, setEditFields] = useState({price: 0, shipping_cost: 0, description: ''});
  
    useEffect(() => {
      const fetchProductDetails = async () => {
        try {
          const response = await fetch(
            `${HOSTED_BASE_URL}/resale/${productId}`,
            {
              headers: {
                "content-type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("accessToken")
              },
            }
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setProductDetails(data);
          setEditFields({price: data.price, shipping_cost: data.shipping_cost, description: data.description});
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };
  
      fetchProductDetails();
    }, [productId]);
  
    const handleResell = async () => {
      try {
        const response = await axios.put(
          `${HOSTED_BASE_URL}/resale/${productId}`,
          {
            _id: productId,
            ...editFields
          },
          {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
          }
        );

        console.log(response.data);

        navigate("/resale");
      } catch (error) {
          console.error('Error updating product:', error);
      }
    }
  
    if (!productDetails) return <Typography>Loading...</Typography>;
  
    return (
      <Box>
        <Navbar />
        <Container maxWidth="lg" sx={{ paddingTop: '82px', paddingBottom: '32px' }}>
          <Typography variant="h4" gutterBottom>Resale Product</Typography>
          
          <Grid container spacing={4}>
            <Grid item md={8}>
              <Card variant="outlined" sx={{ backgroundColor: '#FFFFFF' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', padding: '16px' }}>
                <Avatar variant="square" src={productDetails.image_url} sx={{ marginRight: '16px', width: '200px', height: '200px' }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{productDetails.name}</Typography>
                  <StyledTextField 
                    label="Description"
                    multiline
                    rows={4}
                    value={editFields.description}
                    onChange={(e) => setEditFields({...editFields, description: e.target.value})}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <DetailLine>
                    <StyledTextField
                      label="Price"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      value={editFields.price}
                      onChange={(e) => setEditFields({...editFields, price: e.target.value})}
                      variant="outlined"
                      margin="normal"
                    />
                    <StyledTextField
                      label="Shipping cost"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      value={editFields.shipping_cost}
                      onChange={(e) => setEditFields({...editFields, shipping_cost: e.target.value})}
                      variant="outlined"
                      margin="normal"
                    />
                  </DetailLine>
                </Box>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '16px' }}>
                  <Button
                    sx={{
                      color: "#ffffff",
                      backgroundColor: "#FF4081",
                      "&:hover": {
                        backgroundColor: "#B22C5A"
                      }
                    }}
                    disabled={productDetails.isResold}
                    onClick={handleResell}
                  >
                    Resell
                  </Button>
                </Box>
              </Card>
            </Grid>
            <Grid item md={4}>
                <Card variant="outlined" sx={{ height: 'fit-content', backgroundColor: '#FFFFFF', padding: '16px' }}>
                <StyledCardContent>
                    <Typography variant="h6" color="textSecondary" gutterBottom><b>Category:</b> {productDetails.category}</Typography>
                    <Typography variant="h6" color="textSecondary" gutterBottom><b>Rating:</b> {productDetails.rating}</Typography>
                </StyledCardContent>
                </Card>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </Box>
    );
  };
  
  export default ResaleProductPage;
  