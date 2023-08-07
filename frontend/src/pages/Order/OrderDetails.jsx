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

const TotalLine = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: theme.spacing(2, 0),
}));

const TotalAmount = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

const OrderStatusContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#FFFFFF',
  marginBottom: theme.spacing(2),
}));

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

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `${HOSTED_BASE_URL}/order/${orderId}`,
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
        setOrderDetails(data.order);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

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
