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
import ResalePage from "./pages/Resale/ResalePage";
import ResaleProductPage from "./pages/Resale/ResaleProductPage";
import Faq from "./pages/landing/faq";
import Home from "./pages/landing/home";
import Cart from "./pages/products/Cart";
import ProductListingPage from "./pages/products/ProductListingPage";
import Wishlist from "./pages/products/Wishlist";
import Store from "./pages/store";
import Login from "./pages/login/login"
import SignUp from "./pages/signup/signup";
import Dashboard from "./pages/userDashboard/UserDashboard"
import Checkout from "./pages/checkout/Checkout";
import AuthenticatedRoute from './components/AuthenticatedRoute';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/store" element={<AuthenticatedRoute> <Store /></AuthenticatedRoute>} />
        <Route path="/products" element={ <ProductListingPage /> } />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/fetch_cart_db" element={ <Cart /> } />
        <Route path="/update_qty_db" element={ <Cart /> } />
        <Route path="/delete_cart_item" element={ <Cart />} />
        <Route path="/wishlist" element={ <Wishlist /> } />
        <Route path="/fetch_wishlist_db" element={<Wishlist /> } />
        <Route path="/delete_wishlist_item" element={<Wishlist /> } />
        <Route path="/home" element={ <AuthenticatedRoute> <AdminHomePage /> </AuthenticatedRoute>} />
        <Route path="/employees" element={<AuthenticatedRoute><Employees /></AuthenticatedRoute>} />
        <Route path="/inventory" element={<AuthenticatedRoute><InventoryPage /></AuthenticatedRoute>} />
        <Route path="/sales" element={<AuthenticatedRoute><SalesPage /></AuthenticatedRoute>} />
        <Route path="/order" element={<AuthenticatedRoute><OrdersPage /></AuthenticatedRoute>} />
        <Route path="/order/:orderId" element={<AuthenticatedRoute><OrderDetails /></AuthenticatedRoute>} />
        <Route path="/order/:orderId/cancel" element={<AuthenticatedRoute><OrderCancellation /></AuthenticatedRoute>} />
        <Route path="/resale" element={<AuthenticatedRoute><ResalePage /></AuthenticatedRoute>} />
        <Route path="/resale/:productId" element={<AuthenticatedRoute><ResaleProductPage /></AuthenticatedRoute>} />
        <Route path="/checkout" element={<AuthenticatedRoute><Checkout /></AuthenticatedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<AuthenticatedRoute><Dashboard /></AuthenticatedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
