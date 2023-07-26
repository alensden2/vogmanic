import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import Employees from "./pages/Admin/Employees";
import InventoryPage from "./pages/Admin/Inventory";
import SalesPage from "./pages/Admin/SalesPage";
import ContactPage from "./pages/ContactPage";
import OrderCancellation from "./pages/Order/OrderCancellation";
import OrderDetails from "./pages/Order/OrderDetails";
import OrdersPage from "./pages/Order/OrdersPage";
import Faq from "./pages/landing/faq";
import Home from "./pages/landing/home";
import Cart from "./pages/products/Cart";
import ProductListingPage from "./pages/products/ProductListingPage";
import Wishlist from "./pages/products/Wishlist";
import Store from "./pages/store";

function App() {


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
        <Route path="/delete_wishlist_item" element={<Wishlist />} />
        <Route path="/home" element={<AdminHomePage />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/order" element={<OrdersPage />} />
        <Route path="/order/:orderId" element={<OrderDetails />} />
        <Route path="/order/:orderId/cancel" element={<OrderCancellation />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
