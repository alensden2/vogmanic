/**
 * This page allows users to initiate the cancellation of a specific order by providing a cancellation reason
 * and additional comments. Users can view the order details along with the items included in the order. The
 * cancellation process involves selecting a reason for cancellation and providing optional comments.
 *
 * Key Features:
 * - Displays order details, including the list of items, their names, descriptions, and prices.
 * - Provides a user interface for entering the reason for cancellation and additional comments.
 * - Initiates the cancellation request upon clicking the "Confirm Cancellation" button.
 * - Sends a PUT request to the server with the provided cancellation details for processing.
 * - Handles successful cancellations by navigating to the order details page.
 * - Utilizes Material-UI components for styling and layout.
 *
 * Route Parameters:
 * - orderId: The unique identifier of the order being cancelled.
 *
 * @summary Allows users to cancel an order, providing a cancellation reason and comments.
 *
 * Resources Used:
 * - Material-UI components for styling and layout.
 * - Custom components: Navbar, Footer.
 * - Fetch API for communicating with the backend server.
 * - Constants: HOSTED_BASE_URL for the API endpoint.
 */

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

/**
 * A styled button component designed for cancel actions.
 *
 * Styling:
 * - Background color: Uses the error color from the theme's palette.
 * - Text color: White, for high contrast against the background.
 * - Hover effect: Darkens the background color on hover for visual feedback.
 *
 * Usage:
 * The `CancelButton` is used in the `OrderCancellation` page for confirming the cancellation of an order.
 *
 * @param {object} theme - The Material-UI theme object containing color palette and styling information.
 */
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

    /**
     * useEffect hook for fetching order details based on the provided orderId.
     * Retrieves and sets order details from the server using a GET request.
     *
     * @param {string} orderId - The unique identifier of the order to fetch details for.
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
     * Function to handle the cancellation of an order.
     * Sends a PUT request to the server to cancel the specified order using the provided cancellation reason and comments.
     */
    const handleCancelOrder = async () => {
        try {
            const response = await fetch(`${HOSTED_BASE_URL}/order/${orderId}/cancel`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("accessToken")
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
    /**
     * Loader
     */
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