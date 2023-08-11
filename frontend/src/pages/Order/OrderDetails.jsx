/**
 * This component represents the Order Details page, providing a comprehensive view of an individual order's information.
 * It retrieves and displays details such as items, total amount, delivery charges, tax, and order status.
 * Users can also initiate a return or cancellation for the order. The page showcases a user-friendly layout with organized content.
 *
 * Key Features:
 * - Retrieves and displays order details based on the provided order ID parameter.
 * - Lists individual items in the order, including images, names, descriptions, and prices.
 * - Calculates and presents the total amount, delivery charges, tax, and overall total for the order.
 * - Displays the order's current status with color-coded text based on status (e.g., Placed, Shipped, Delivered, Cancelled).
 * - Allows users to initiate a return or cancellation action, with appropriate visual cues and disabled functionality for cancelled orders.
 * - Presents shipping address information for the order.
 *
 * Resources Used:
 * - Material-UI components for structured layout, cards, list items, buttons, and typography.
 * - Styled components for custom styling, including total amount and order status text color.
 * - Navigation features from 'react-router-dom' to facilitate navigation to other pages.
 * - Fetches order details from the API using the provided order ID.
 *
 * Note: This component assumes the availability of 'HOSTED_BASE_URL' and authentication with 'localStorage'.
 */

import {
  Avatar,
  Box,
  Button,
  Card, CardContent,
  Container,
  Divider,
  Grid,
  List, ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  styled
} from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { HOSTED_BASE_URL } from '../../constants';

/**
 * Styled component that represents a container for a line displaying two elements with space between.
 * It utilizes flex display to align items horizontally, ensuring proper spacing and alignment.
 *
 * Usage Example:
 * <TotalLine>
 *   <Typography>Label:</Typography>
 *   <TotalAmount>$123.45</TotalAmount>
 * </TotalLine>
 */
const TotalLine = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: theme.spacing(2, 0),
}));

/**
 * Styled Typography component for displaying a bold and primary-colored total amount.
 * This component is typically used within a TotalLine styled container to represent a monetary value.
 *
 * Usage Example:
 * <TotalLine>
 *   <Typography>Subtotal:</Typography>
 *   <TotalAmount>$200.00</TotalAmount>
 * </TotalLine>
 */
const TotalAmount = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

/**
 * Styled Paper component that represents a container for displaying the order status details.
 * It provides padding, a white background, and margin at the bottom for proper spacing.
 * The styling may vary based on the current theme.
 *
 */
const OrderStatusContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#FFFFFF',
  marginBottom: theme.spacing(2),
}));

/**
 * Styled Typography component that represents the text displaying the order status.
 * The color and font weight of the text are customized based on the provided status.
 * It dynamically assigns colors to different order statuses using the theme's palette.
 * If the status is not recognized, the default text color and bold font weight are applied.
 *
 * @param {string} status - The current order status (e.g., 'Placed', 'Shipped', 'Delivered', 'Cancelled').
 */
const OrderStatusText = styled(Typography)(({ theme, status }) => {
  let color;
  switch (status) {
    case 'Placed':
      color = theme.palette.warning.light;
      break;
    case 'Shipped':
      color = theme.palette.info.light;
      break;
    case 'Delivered':
      color = theme.palette.success.light;
      break;
    case 'Cancelled':
      color = theme.palette.error.light;
      break;
    default:
      color = theme.palette.text.primary;
  }
  return { color, fontWeight: 'bold' };
});

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  /**
   * Fetches the details of a specific order using the provided order ID.
   * Updates the component's state with the retrieved order details.
   * Handles potential network errors during the fetch process.
   */
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `${HOSTED_BASE_URL}/order/${orderId}`,
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
        setOrderDetails(data.order);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  /**
   * Navigates to the cancellation page for the specific order.
   */
  const handleReturnCancel = () => {
    navigate(`/order/${orderId}/cancel`);
  }
  if (!orderDetails) return <Typography>Loading...</Typography>;
  const total = orderDetails.totalAmount + orderDetails.deliveryCharges + orderDetails.tax;
  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ paddingTop: '82px', paddingBottom: '32px' }}>
        <Typography variant="h4" gutterBottom>Order Details for {orderDetails.orderId}</Typography>
        <Grid container spacing={4}>
          <Grid item md={8}>
            <Card variant="outlined" sx={{ backgroundColor: '#FFFFFF' }}>
              <List>
                {orderDetails.items.map(item => (
                  <ListItem key={item._id} sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ListItemAvatar>
                        <Avatar variant="square" src={item.image_url} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={`Description: ${item.description}`}
                      />
                    </Box>
                    <Typography>${item.price.toFixed(2)}</Typography>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <CardContent>
                <TotalLine>
                  <Typography>Total Amount:</Typography>
                  <TotalAmount>${orderDetails.totalAmount.toFixed(2)}</TotalAmount>
                </TotalLine>
                <TotalLine>
                  <Typography>Delivery Charges:</Typography>
                  <TotalAmount>${orderDetails.deliveryCharges.toFixed(2)}</TotalAmount>
                </TotalLine>
                <TotalLine>
                  <Typography>Tax:</Typography>
                  <TotalAmount>${orderDetails.tax.toFixed(2)}</TotalAmount>
                </TotalLine>
                <Divider />
                <TotalLine>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">${total.toFixed(2)}</Typography>
                </TotalLine>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                <Button
                  sx={{
                    color: "#ffffff",
                    backgroundColor: "#FF4081",
                    "&:hover": {
                      backgroundColor: "#B22C5A"
                    }
                  }}
                  disabled={orderDetails.status === 'Cancelled'}
                  onClick={handleReturnCancel}
                >
                  Return/Cancel
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid item md={4}>
            <OrderStatusContainer>
              <Typography variant="h6" gutterBottom>Order Status:</Typography>
              <OrderStatusText status={orderDetails.status}>
                {orderDetails.status}
              </OrderStatusText>
            </OrderStatusContainer>
            <Card variant="outlined" sx={{ height: 'fit-content', backgroundColor: '#FFFFFF' }}>
              <CardContent>
                <Typography variant="h6">Shipping Address:</Typography>
                <Typography>{orderDetails.shippingAddress}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default OrderDetails;