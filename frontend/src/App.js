import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/landing/home";
import ContactPage from "./pages/ContactPage";
import Faq from "./pages/landing/faq";
import Store from "./pages/store";
import ProductListingPage from "./pages/products/ProductListingPage";
import Cart from "./pages/products/Cart"
import Wishlist from "./pages/products/Wishlist"
import Checkout from "./pages/checkout/Checkout";

function App() {

  console.log("app");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/store" element={<Store />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/fetch_cart_db" element={<Cart />} />
        <Route path="/update_qty_db" element={<Cart />} />
        <Route path="/delete_cart_item" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/fetch_wishlist_db" element={<Wishlist />} />
        <Route path="/delete_wishlist_item" element={<Wishlist/>} />
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
