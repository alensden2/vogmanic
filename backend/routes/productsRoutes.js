const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// Apply authentication middleware to all routes
router.use(authMiddleware);

const Products = require('../controllers/Products/ProductController');

/** Fetch Products
 * Retrieve products based on given criteria
 */
router.post('/products', Products.fetchProducts);

/** Save Cart Details to Database
 * Save user's cart details to the database
 */
router.post('/save_cart_db', Products.saveCartDetailsToDB);

/** Fetch Cart Details from Database
 * Retrieve user's cart details from the database
 */
router.post('/fetch_cart_db', Products.fetchCartDetailsFromDB);

/** Update Cart Quantity in Database
 * Update the quantity of a specific item in the user's cart
 */
router.post('/update_qty_db', Products.updateCartQuantity);

/** Delete Cart Item
 * Delete a specific item from the user's cart
 */
router.post('/delete_cart_item', Products.deleteCartItem);

/** Save Wishlist Details to Database
 * Save user's wishlist details to the database
 */
router.post('/save_wishlist_db', Products.saveWishlistDetailsToDB);

/** Fetch Wishlist Details from Database
 * Retrieve user's wishlist details from the database
 */
router.post('/fetch_wishlist_db', Products.fetchWishlistDetailsFromDB);

/** Delete Wishlist Item
 * Delete a specific item from the user's wishlist
 */
router.post('/delete_wishlist_item', Products.deleteWishlistItem);

/** Delete Cart
 * Delete user's entire cart
 */
router.post('/deleteCart', Products.deleteCart);

module.exports = router;
