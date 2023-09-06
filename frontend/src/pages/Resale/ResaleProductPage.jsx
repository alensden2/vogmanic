/*
 * The `ResaleProductPage` component displays the detailed information of a resale product and allows editing its details for resale.
 *
 * Core Functionality:
 * - Fetches the detailed information of a specific resale product from the backend.
 * - Displays product details, such as name, image, description, price, shipping cost, category, and rating.
 * - Provides fields to edit the price, shipping cost, and description of the resale product.
 * - Allows users to initiate the resale process for the product.
 *
 * Features:
 * - Utilizes Material-UI components for a clean and responsive design.
 * - Fetches product details based on the `productId` obtained from the URL parameters.
 * - Provides fields for users to modify price, shipping cost, and description before resale.
 * - Displays the product's category and rating in a separate card.
 * - Offers a "Resell" button to initiate the resale process.
 * - Handles API requests for updating product details and navigating back to the resale product list.
 *
 * Dependencies:
 * - Requires the `productId` parameter from React Router for fetching the correct product details.
 * - Utilizes `styled` components from Material-UI to style specific components.
 * - Depends on Material-UI components for various layout and input elements.
 * - Relies on the `axios` library for making API requests to the backend.
 * - Requires `useNavigate` and `useParams` from React Router for navigation and URL parameters.
 *
 * Usage:
 * - Render this component when navigating to a specific resale product's detailed view.
 * - Displays the product's details and allows editing before initiating the resale process.
 * - Provides a user-friendly interface for users to update product information for resale.
 */
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

/*
* The `DetailLine` styled component defines a flex container for displaying details with space-between alignment.
*
* Core Functionality:
* - Creates a flex container for arranging child elements with space between them.
* - Aligns child elements along the center vertically.
* - Provides margin for spacing between detail lines.
*
* Usage:
* - Apply this styled component to create a horizontal line of details with space between them.
* - Useful for aligning and displaying pairs of related information with consistent spacing.
* - Can be used within various components for consistent styling of detail lines.
*/
const DetailLine = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: theme.spacing(2, 0),
}));

/*
* The `StyledTextField` styled component customizes the appearance of MUI's TextField component.
*
* Core Functionality:
* - Modifies the color of the label when the TextField is focused.
* - Changes the color of the underline when the TextField is focused.
* - Adjusts the border color of the outlined TextField when focused.
*
* Usage:
* - Apply this styled component to customize the appearance of TextField components.
* - Provides a consistent and visually appealing design for text input fields.
* - Helps improve user experience by providing clear visual cues for focused input fields.
*/
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

/*
* The `StyledCardContent` styled component customizes the appearance of MUI's CardContent component.
*
* Core Functionality:
* - Sets the background color of the CardContent to white (#FFFFFF).
* - Applies a border radius of 4px to the CardContent.
* - Adds padding to the CardContent to create space around its content.
* - Increases the bottom padding for the last child (useful for spacing within grids).
*
* Usage:
* - Apply this styled component to customize the appearance of CardContent components.
* - Provides a consistent and visually appealing design for content within cards.
* - Helps maintain a cohesive design across the application's card-based layouts.
*/
const StyledCardContent = styled(CardContent)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  borderRadius: '4px',
  padding: theme.spacing(2),
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
}));

/*
* The `ResaleProductPage` component displays detailed information about a resale product and allows editing of certain fields.
*
* Core Functionality:
* - Fetches and displays detailed information about a resale product using the `productId` from the URL parameter.
* - Provides fields for editing the price, shipping cost, and description of the resale product.
* - Allows the user to resell the product by updating its details through an API call.
*
* Features:
* - Utilizes React Router's `useParams` hook to extract the `productId` from the URL.
* - Makes an authenticated API request to fetch product details from the backend.
* - Initializes state variables for the fetched product details and editable fields.
* - Dynamically updates the editable fields when product details are fetched.
* - Displays the product image, name, and various details in a visually organized layout.
* - Enables the user to modify the price, shipping cost, and description using styled text fields.
* - Provides a "Resell" button to update the product details and trigger the reselling process.
* - Utilizes Material-UI's styled components for consistent and customizable styling.
*
* Usage:
* - Access this component by navigating to `/resale/:productId` route, where `:productId` is the product's unique identifier.
* - Allows users to view and edit details of a specific resale product for reselling purposes.
* - Enhances user experience by providing a clear and structured interface for managing resale products.
*/
const ResaleProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState(null);
  const [editFields, setEditFields] = useState({ price: 0, shipping_cost: 0, description: '' });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `${HOSTED_BASE_URL}/resale/${productId}`,
          {
            headers: {
              "content-type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductDetails(data);
        setEditFields({ price: data.price, shipping_cost: data.shipping_cost, description: data.description });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  /*
  * The `handleResell` function initiates the process of updating and reselling a product's details.
  *
  * Core Functionality:
  * - Makes an authenticated API call to the backend to update the resale product's details.
  * - Utilizes the `axios` library to perform a PUT request with the modified fields.
  * - Navigates back to the resale products listing page after successful reselling.
  *
  * Features:
  * - Dynamically constructs the API endpoint for updating the product using the provided `productId`.
  * - Sends the updated fields (price, shipping cost, description) along with the product's unique identifier.
  * - Implements error handling to log any errors that occur during the update process.
  * - Utilizes local storage to include the user's authorization token in the request headers.
  * - Enhances user experience by providing real-time updates to the resale product's information.
  *
  * Usage:
  * - Called when the user clicks the "Resell" button to update and resell the product.
  * - Provides a seamless way for users to modify and resell their products from the product details page.
  * - Ensures that the updated details are immediately reflected in the resale products listing.
  */
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
                    onChange={(e) => setEditFields({ ...editFields, description: e.target.value })}
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
                      onChange={(e) => setEditFields({ ...editFields, price: e.target.value })}
                      variant="outlined"
                      margin="normal"
                    />
                    <StyledTextField
                      label="Shipping cost"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      value={editFields.shipping_cost}
                      onChange={(e) => setEditFields({ ...editFields, shipping_cost: e.target.value })}
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