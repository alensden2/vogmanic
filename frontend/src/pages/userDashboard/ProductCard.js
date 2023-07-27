import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router';

const ProductCard = ({ product, noContent }) => {
  const navigate=useNavigate();

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
      case 'Receipts':
        navigate('/dashboard');
        break;
      default:
        break;
    }
  };

  
  return (
    <>
      {product && (
        <Card sx={cardStyles}>
          <CardHeader title={product.name} />
          {product.image && <CardMedia component="img" height="100" image={product.image} alt={product.name} />}
          <CardContent>
            <Typography variant="body2">Price: ${product.price}</Typography>
            <Typography variant="body2">Description: {product.description}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleRedirect} style={{ backgroundColor: 'black', color: 'white', marginTop: '20px' }}>
              View More
            </Button>
          </CardActions>
          {!product.image && !noContent && (
            <CardContent>
              {/* Render additional content if needed */}
            </CardContent>
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
