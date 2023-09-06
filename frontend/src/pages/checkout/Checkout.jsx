/** 
 * Checkout component for handling order placement and payment.
 * This component displays a form for users to provide their shipping information,
 * select payment method (PayPal), and review their order details before confirming the order.
 */
import { Button, Container, Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { HOSTED_BASE_URL } from "../../constants";
import "./checkout.css";

function Checkout() {
  const [confirmed, isConfirmed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProduct] = useState(location.state.cartProducts);
  const [payment, setPayment] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [disabled, setDisabled] = useState(false);
  /**
   * Calculate the total amount of the products in the cart based on their prices and quantities.
   * @returns {number} Total amount of the products in the cart.
   */
  const calculateTotalAmount = () => {
    return products.reduce(
      (total, element) => total + element.price * element.count,
      0
    );
  };

  /**
   * State object that holds the form data for the user's checkout information.
   * Includes fields for first name, last name, email, state, city, pincode, and phone number.
   */
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
    phoneNo: "",
  });

  /**
   * Event handler function that updates the formData state based on user input changes.
   * It uses object destructuring to extract the 'name' and 'value' properties from the event target.
   * The function then updates the state using the spread operator to maintain existing form data and update the specific field.
   * @param {Event} event - The event object triggered by the user input change.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Function that validates the form data by checking for any empty or missing fields.
   * It iterates through each key in the formData state object and checks if the value is falsy (empty or undefined).
   * If a field is missing or empty, it sets an error message for that field in the formErrors state object.
   * After checking all fields, it updates the formErrors state with the error messages.
   * Finally, it returns a boolean indicating whether the form is valid (true) or has errors (false).
   * @returns {boolean} - True if the form is valid, false if there are errors.
   */
  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = "This field is required";
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Function that handles the form submission when the user clicks the "Confirm Order" button.
   * It prevents the default form submission behavior to handle form submission manually.
   * Validates the form data using the validateForm function.
   * If the form is valid and the payment is successful (payment variable is true):
   * - Creates an order object with order details including products, shipping address, and user email.
   * - Sends a POST request to the backend API to place the order in the database.
   * - If the order placement is successful, marks the order as confirmed (isConfirmed state is set to true).
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid && payment) {
      const order = {
        orderId: localStorage.getItem("userEmail") + Math.random(),
        items: products,
        shippingAddress: formData.city + ", " + formData.state + ", " + formData.pincode,
        userEmail: localStorage.getItem("userEmail")
      };
      const response = fetch(HOSTED_BASE_URL + "/order/place", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message == "Order placed successfully") {
            isConfirmed(true)
          }
        });
    }
  };

  const totalAmount = calculateTotalAmount();

  /**
   * useEffect hook that runs when the `confirmed` state changes.
   * If the `confirmed` state is true (i.e., the order has been confirmed),
   * the hook sends a POST request to the backend API to delete the user's cart items.
   * After that, it navigates the user to the home page ("/").
   * This effect helps in cleaning up the user's cart after a successful order placement.
   */
  useEffect(() => {
    if (confirmed) {
      fetch(HOSTED_BASE_URL + "/product/deleteCart", {
        method: "POST",
        body: JSON.stringify({ email: localStorage.getItem("userEmail") }),
        headers: {
          "content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
      })
      navigate("/order");
    }

  }, [confirmed])
  return (
    <div className="body">
      <Navbar />
      <div className="checkout">
        <div className="form">
          <Typography component="div" variant="h5" color="primary" sx={{ color: 'black' }}>
            Checkout
          </Typography>
          <Container maxWidth="sm">
            <form method="POST" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    error={!!formErrors.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    error={!!formErrors.lastName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    error={!!formErrors.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={formData.state}
                    error={!!formErrors.state}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    error={!!formErrors.city}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    error={!!formErrors.pincode}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNo"
                    value={formData.phoneNo}
                    error={!!formErrors.phoneNo}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <div className="payment">
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "Afr-hvcMCINThspozufK6vkPjUnGanXsucXrxjgbbwzqHcbvSE-eGQkCJq6tqmq4l1pFX4C6lT_6v3_b",
                    currency: "CAD",
                  }}
                >
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: parseInt(totalAmount),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={function (data, actions) {
                      return actions.order.capture().then(function (details) {
                        if (details.status == "COMPLETED") {
                          setDisabled(true);
                          setPayment(true);
                        }
                      });
                    }}
                    disabled={disabled}
                  />
                </PayPalScriptProvider>
              </div>
              <Grid item xs={12}>
                <Button sx={{ alignSelf: 'center', backgroundColor: 'beige', color: 'black', borderColor: 'black', fontWeight: 'bold' }} type="submit" variant="contained" color="primary">
                  Confirm Order
                </Button>
              </Grid>
            </form>
          </Container>
        </div>
        <div className="order_review">
          <Typography sx={{ color: 'black' }} variant="h6" color="primary">
            Order Review
          </Typography>
          {products.map((element) => {
            return (
              <Card
                sx={{ display: "flex", height: "120px" }}
                className="product_item"
                key={element._id}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={element.image_url}
                  alt="Live from space album cover"
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {element.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      {element.price} CAD x {element.count}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  ></Box>
                </Box>
              </Card>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;