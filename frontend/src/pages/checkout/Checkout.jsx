import Navbar from "../../components/navbar";
import { Container } from "@mui/material";
import { useState } from "react";
import "./checkout.css";
import { TextField, Button, Grid } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Checkout() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
    phoneNo: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="body">
      <Navbar />
      <div className="checkout">
        <div className="form">
          <h3>Checkout</h3>
          <Container maxWidth="sm">
            <form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <div className="payment">
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "Afr-hvcMCINThspozufK6vkPjUnGanXsucXrxjgbbwzqHcbvSE-eGQkCJq6tqmq4l1pFX4C6lT_6v3_b",
                  }}
                >
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: "2.00",
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={function (data, actions) {
                      return actions.order.capture().then(function (details) {
                        console.log(details);
                      });
                    }}
                  />
                </PayPalScriptProvider>
              </div>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </form>
          </Container>
        </div>
        <div className="order_review">Order Review</div>
      </div>
    </div>
  );
}

export default Checkout;
