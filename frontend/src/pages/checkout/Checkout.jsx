import Navbar from "../../components/navbar";
import { Container } from "@mui/material";
import { useState } from "react";
import "./checkout.css";
import { TextField, Button, Grid } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Footer from "../../components/footer";
import { useLocation, useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { HOSTED_BASE_URL } from "../../constants";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const products = location.state.cartProducts;
  console.log(products);

  const [payment, setPayment] = useState(false);
  const calculateTotalAmount = () => {
    return products.reduce(
      (total, element) => total + element.price * element.count,
      0
    );
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
    phoneNo: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    // Check for required fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = "This field is required";
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation
    const isFormValid = validateForm();
    console.log(payment);
    if (isFormValid && payment) {
      // Submit form logic here
      console.log("Form submitted successfully");
      //make post request to backend to add order to mongodb

      const user=JSON.parse(localStorage.getItem("user"));
      const order = {
        userEmail: user.email,
        orderId: "order123",
        items: products,
        shippingAddress: "abc",
      };
      console.log(order);
      const response = fetch(HOSTED_BASE_URL + "/order/place", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "content-type": "application/json",
          "Authorization": "Bearer "+localStorage.getItem("accessToken")
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.message == "Order placed successfully") {
            //update inventory
            navigate("/");
            console.log("order placed");
          }
        });
    }
  };

  const [disabled, setDisabled] = useState(false);

  const totalAmount = calculateTotalAmount();

  return (
    <div className="body">
      <Navbar />
      <div className="checkout">
        <div className="form">
          <Typography component="div" variant="h5">
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
                        console.log(details);
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
                <Button type="submit" variant="contained" color="primary">
                  Confirm Order
                </Button>
              </Grid>
            </form>
          </Container>
        </div>
        <div className="order_review">
          <h2>Order Review</h2>
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
