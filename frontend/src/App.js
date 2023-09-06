/*
 * The `App` component is the root component of the application, responsible for defining the routing structure.
 * It utilizes the `react-router-dom` library to handle different routes and render corresponding components.
 *
 * Core Functionality:
 * - Sets up routing for various pages and components.
 * - Utilizes `Routes` and `Route` components from `react-router-dom` for declarative routing.
 * - Uses `AuthenticatedRoute` component to wrap routes that require authentication.
 *
 * Routes:
 * - "/" (Home): Renders the landing home page.
 * - "/contact": Renders the contact page.
 * - "/faq": Renders the frequently asked questions (FAQ) page.
 * - "/store": Renders the authenticated user's store page.
 * - "/products": Renders the product listing page for authenticated users.
 * - "/cart": Renders the cart page for authenticated users.
 * - "/wishlist": Renders the wishlist page for authenticated users.
 * - "/home": Renders the admin home page for authenticated admin users.
 * - "/employees": Renders the employees page for authenticated admin users.
 * - "/inventory": Renders the inventory page for authenticated admin users.
 * - "/sales": Renders the sales page for authenticated admin users.
 * - "/order": Renders the orders page for authenticated admin users.
 * - "/order/:orderId": Renders the order details page for authenticated admin users.
 * - "/order/:orderId/cancel": Renders the order cancellation page for authenticated admin users.
 * - "/resale": Renders the resale page for authenticated users.
 * - "/resale/:productId": Renders the resale product page for authenticated users.
 * - "/checkout": Renders the checkout page for authenticated users.
 * - "/login": Renders the login page.
 * - "/signup": Renders the signup page.
 * - "/dashboard": Renders the user dashboard page for authenticated users.
 *
 * Note:
 * - The `AuthenticatedRoute` component is used to wrap routes that require authentication to access.
 */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthenticatedRoute from './components/AuthenticatedRoute';
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
import Checkout from "./pages/checkout/Checkout";
import Faq from "./pages/landing/faq";
import Home from "./pages/landing/home";
import Login from "./pages/login/login";
import Cart from "./pages/products/Cart";
import ProductListingPage from "./pages/products/ProductListingPage";
import Wishlist from "./pages/products/Wishlist";
import SignUp from "./pages/signup/signup";
import Store from "./pages/store";
import Dashboard from "./pages/userDashboard/UserDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/store" element={<AuthenticatedRoute> <Store /></AuthenticatedRoute>} />
        <Route path="/products" element={<AuthenticatedRoute><ProductListingPage /></AuthenticatedRoute>} />
        <Route path="/cart" element={<AuthenticatedRoute><Cart /></AuthenticatedRoute>} />
        <Route path="/wishlist" element={<AuthenticatedRoute><Wishlist /></AuthenticatedRoute>} />
        <Route path="/home" element={<AuthenticatedRoute> <AdminHomePage /> </AuthenticatedRoute>} />
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