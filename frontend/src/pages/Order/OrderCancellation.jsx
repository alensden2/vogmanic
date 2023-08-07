import {
    Avatar,
    Box,
    Button,
    Card, CardContent,
    Container,
    Divider,
    Grid,
    ListItem, ListItemAvatar,
    ListItemText,
    TextField,
    Typography,
    styled
} from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { HOSTED_BASE_URL } from '../../constants';

const CancelButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    '&:hover': {
        backgroundColor: theme.palette.error.dark,
    }
}));

const OrderCancellation = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [cancellationReason, setCancellationReason] = useState("");
    const [cancellationComments, setCancellationComments] = useState("");
    const navigate = useNavigate();

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

    const handleCancelOrder = async () => {
        try {
            const response = await fetch(`${HOSTED_BASE_URL}/order/${orderId}/cancel`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer "+localStorage.getItem("accessToken")
                },
                body: JSON.stringify({
                    cancellationReason,
                    cancellationComments
                })
            });

            if (response.ok) {
                navigate(`/order/${orderId}`);
            } else {
                const data = await response.json();
                console.error('Error updating order:', data.message);
            }
        } catch (error) {
            console.error('Error sending cancel request:', error);
        }
    };

    if (!orderDetails) return <Typography>Loading...</Typography>;

    return (
        <Box>
            <Navbar />
            <Container maxWidth="lg" sx={{ paddingTop: '82px', paddingBottom: '32px' }}>
                <Typography variant="h4" gutterBottom>Cancel Order {orderDetails.orderId}</Typography>
                <Grid container spacing={4}>
                    <Grid item md={6}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6">Order Details</Typography>
                                <Divider sx={{ my: 2 }} />
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
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={6}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6">Cancellation Details</Typography>
                                <Divider sx={{ my: 2 }} />
                                <TextField
                                    fullWidth
                                    label="Reason for Cancellation"
                                    variant="outlined"
                                    value={cancellationReason}
                                    onChange={(e) => setCancellationReason(e.target.value)}
                                    sx={{ my: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Additional Comments"
                                    variant="outlined"
                                    value={cancellationComments}
                                    onChange={(e) => setCancellationComments(e.target.value)}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <CancelButton onClick={handleCancelOrder}>
                        Confirm Cancellation
                    </CancelButton>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default OrderCancellation;
