import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router';

const ProductCard = ({ product, noContent }) => {
  const navigate = useNavigate();

  const cardStyles = {
    marginBottom: "3vh",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: '#FFFFFF', // Set beige color for cards
    color: '#000000', // Set black color for text
    width: '100%', // Set full width for cards on smaller screens
  };

  const handleRedirect = () => {
    switch (product.name) {
      case 'Shopping Cart':
        navigate('/cart');
        break;
      case 'Wishlist':
        navigate('/wishlist');
        break;
      case 'Recent Orders':
        navigate('/order');
        break;
      case 'Resale':
        navigate('/resale');
        break;
      default:
        break;
    }
  };

  let cardContent = null;
  switch (product.name) {
    case 'Shopping Cart':
      cardContent = (
        <>
          <Typography variant="body2">
            View all of your purchases here.
          </Typography>
          <Typography variant="body2" style={{ marginTop: '8px' }}>
            Review your selections, update quantities, and proceed to checkout.
          </Typography>
        </>
      );
      break;
    case 'Wishlist':
      cardContent = (
        <>
          <Typography variant="body2">
            Products that you liked!
          </Typography>
          <Typography variant="body2" style={{ marginTop: '8px' }}>
            Keep track of items you're interested in. Move to cart when ready to buy.
          </Typography>
        </>
      );
      break;
    case 'Recent Orders':
      cardContent = (
        <>
          <Typography variant="body2">
            View your recent purchases! Click an order for details.
          </Typography>
          <Typography variant="body2" style={{ marginTop: '8px' }}>
            Find past orders, track packages, and view order history.
          </Typography>
        </>
      );
      break;
    case 'Resale':
      cardContent = (
        <>
          <Typography variant="body2">
            Our resale marketplace.
          </Typography>
          <Typography variant="body2" style={{ marginTop: '8px' }}>
            Find second-hand products for purchase or list items to sell.
          </Typography>
        </>
      );
      break;
    default:
      break;
  }

  return (
    <>
      {product && (
        <Card sx={cardStyles}>
          <CardHeader title={product.name} />
          {product.image && <CardMedia component="img" height="100" image={product.image} alt={product.name} />}
          <CardContent>
            {cardContent}
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={handleRedirect}
              style={{ backgroundColor: 'black', color: 'white', marginTop: '20px' }}
            >
              View More
            </Button>
          </CardActions>
          {!product.image && !noContent && (
            <CardContent></CardContent>
          )}
          {noContent && (
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                No more content
              </Typography>
            </CardContent>
          )}
        </Card>
      )}
    </>
  );
};

export default ProductCard;