const express = require('express');
const router = express.Router();

const Products = require('../controllers/Products/ProductController');
router.post('/products', Products.fetchProducts);
router.post('/save_cart_db', Products.saveCartDetailsToDB);
router.post('/fetch_cart_db', Products.fetchCartDetailsFromDB);
router.post('/update_qty_db', Products.updateCartQuantity);
router.post('/delete_cart_item', Products.deleteCartItem);
router.post('/save_wishlist_db', Products.saveWishlistDetailsToDB);
router.post('/fetch_wishlist_db', Products.fetchWishlistDetailsFromDB);
router.post('/delete_wishlist_item', Products.deleteWishlistItem)

module.exports = router;
