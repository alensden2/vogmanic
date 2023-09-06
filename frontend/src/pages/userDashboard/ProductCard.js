/*
 * The `ProductCard` component is used to display information cards for different sections on the user dashboard.
 * It receives props `product` and `noContent` to customize the card's content and behavior.
 *
 * Core Functionality:
 * - Renders a card with a title, optional image, and descriptive content based on the provided product name.
 * - Handles redirection to specific routes based on the selected product using the `useNavigate` hook.
 *
 * Features:
 * - Provides visual and textual representation of different dashboard sections.
 * - Offers a "View More" button to navigate to the relevant section.
 * - Handles cases where there's no image or no more content to display.
 * - Enhances user experience by providing information about each section's purpose.
 *
 * Usage:
 * - Used within the `AccessPanel` component to display various dashboard sections.
 * - Configured to show different content based on the provided product name.
 * - Supports redirection to specific routes for each section.
 */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

const ProductCard = ({ product, noContent }) => {
  const navigate = useNavigate();
  /*
  * The `cardStyles` object defines the styling properties for the information cards displayed in the `ProductCard` component.
  *
  * Styling Properties:
  * - `marginBottom`: Adds vertical spacing between cards.
  * - `display`: Uses flex layout with a column direction to arrange card elements.
  * - `justifyContent`: Distributes space evenly between card content, creating space between the header, content, and actions.
  * - `background`: Sets the background color of the card to beige (#FFFFFF).
  * - `color`: Sets the text color to black (#000000).
  * - `width`: Ensures the card takes up the full width of the parent container on smaller screens.
  *
  * These styles contribute to a visually appealing and user-friendly card design.
  */
  const cardStyles = {
    marginBottom: "3vh",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: '#FFFFFF', // Set beige color for cards
    color: '#000000', // Set black color for text
    width: '100%', // Set full width for cards on smaller screens
  };

  /*
  * The `handleRedirect` function determines the navigation destination based on the product name and redirects the user to the appropriate route.
  *
  * Redirect Logic:
  * - If the product name is "Shopping Cart", navigates to the "/cart" route.
  * - If the product name is "Wishlist", navigates to the "/wishlist" route.
  * - If the product name is "Recent Orders", navigates to the "/order" route.
  * - If the product name is "Resale", navigates to the "/resale" route.
  * - For other cases, no redirection is performed.
  *
  * This function enhances user experience by providing seamless navigation to relevant sections based on the clicked product card.
  */
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
  /*
  * The following `switch` block generates the content to be displayed in the card based on the product name.
  *
  * Card Content Generation:
  * - For the "Shopping Cart" product, displays information about viewing purchases, reviewing selections, and proceeding to checkout.
  * - For the "Wishlist" product, provides details about tracking liked items and moving them to the cart.
  * - For the "Recent Orders" product, presents information about viewing recent purchases, order details, and history.
  * - For the "Resale" product, describes the resale marketplace and its functionality for buying and selling second-hand items.
  * - For other cases, no card content is assigned.
  *
  * This logic enhances user understanding by providing relevant descriptions for each product type displayed in the card.
  */
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