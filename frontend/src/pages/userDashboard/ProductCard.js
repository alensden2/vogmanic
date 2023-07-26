import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Button, useMediaQuery, useTheme } from '@mui/material';

const ProductCard = ({ product, noContent }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const cardStyles = {
    marginBottom: "3vh",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: '#FFFFFF', // Set beige color for cards
    color: '#000000', // Set black color for text
    width: '100%', // Set full width for cards on smaller screens
  };

  // Calculate the maximum height among the cards with content
  const maxCardContentHeight = 120; // Adjust this value to fit the cards within the dimensions 1280x720

  return (
    <Card sx={cardStyles}>
      <CardHeader title={product.name} />
      {product.image && <CardMedia component="img" height="100" image={product.image} alt={product.name} />}
      <CardContent>
        <Typography variant="body2">Price: ${product.price}</Typography>
        <Typography variant="body2">Description: {product.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => window.alert('You clicked View More!')}>
          View More
        </Button>
      </CardActions>
      {!product.image && !noContent && (
        <CardContent>
       
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
  );
};

export default ProductCard;
