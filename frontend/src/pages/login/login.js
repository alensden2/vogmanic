/*
 * The `Login` component handles user authentication and login functionality.
 *
 * User Login:
 * - Users enter their email and password in the input fields.
 * - The component validates the email format and password strength according to defined regex patterns.
 * - Upon successful validation, the user's credentials are sent to the server for verification.
 * - If login is successful, the user's access token is stored in local storage, and they are redirected to the appropriate page based on their role.
 * - If login fails, error messages are shown to the user.
 *
 * Password Strength:
 * - The component calculates password strength based on length, capital letters, numbers, and special characters.
 * - If the password is weak, error messages indicating the required criteria are displayed.
 *
 * Responsive Design:
 * - The component provides a responsive layout with different views for wide screens and smaller screens.
 * - For wide screens, a "Sign Up" section is displayed alongside the login form to encourage user registration.
 *
 * Navigation:
 * - The component uses the `useNavigate` hook to handle navigation to the signup page upon clicking the "Sign Up" button.
 *
 * Enhancing User Experience:
 * - The component provides real-time feedback on email and password input validity.
 * - It helps users understand password requirements and shows password strength indications.
 * - Alerts are displayed for successful login, login failure, and unexpected errors.
 */

import { Box, Button, Container, Grid, TextField, Typography, useMediaQuery, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import { HOSTED_BASE_URL } from '../../constants';

function Login() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState([]);
  const adminEmail = 'admin456@admin.com';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/signup");
  };

  /*
  * The `handleSignup` function is responsible for navigating the user to the signup page.
  *
  * Navigation to Signup Page:
  * - When the "Sign Up" button is clicked, this function is triggered.
  * - It uses the `useNavigate` hook to navigate to the "/signup" route, where users can register.
  * - Users are encouraged to sign up for a new account by clicking this button.
  *
  * The `handleEmailChange` function is responsible for handling changes to the email input field.
  *
  * Email Validation:
  * - When the user types in the email input field, this function is triggered.
  * - It updates the `email` state with the current value of the input.
  * - It validates the email format using a regex pattern (`emailRegex`).
  * - If the input email doesn't match the expected format, the `emailError` state is set to `true`.
  * - This provides real-time feedback to the user by highlighting the input field or showing an error message.
  */
  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setEmailError(!emailRegex.test(inputEmail));
  };

  /*
  * The `handlePasswordChange` function is responsible for handling changes to the password input field.
  *
  * Password Strength and Validation:
  * - When the user types in the password input field, this function is triggered.
  * - It updates the `password` state with the current value of the input.
  * - It validates the password format using a regex pattern (`passwordRegex`).
  * - If the input password doesn't match the expected format, the `passwordError` state is set to `true`.
  * - The function also calculates the strength of the password based on various criteria (length, capital letter, number, special character).
  * - It constructs an array of strength messages based on the password's adherence to these criteria.
  * - The `passwordStrength` state is updated with these messages to provide real-time feedback to the user.
  *
  * Password Strength Criteria:
  * - Minimum 8 characters
  * - At least one capital letter
  * - At least one number
  * - At least one special character (e.g., @$!%*?&)
  *
  * This function enhances user experience by providing real-time password strength feedback and validation.
  */
  const handlePasswordChange = (event) => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
    setPasswordError(!passwordRegex.test(inputPassword));

    // Check password strength and set messages accordingly
    let strengthMessages = [];

    if (inputPassword.length < 8) {
      strengthMessages.push('Minimum 8 characters');
    }

    if (!/(?=.*[A-Z])/.test(inputPassword)) {
      strengthMessages.push('At least one capital letter');
    }

    if (!/(?=.*\d)/.test(inputPassword)) {
      strengthMessages.push('At least one number');
    }

    if (!/(?=.*[@$!%*?&])/.test(inputPassword)) {
      strengthMessages.push('At least one special character');
    }

    setPasswordStrength(strengthMessages);
  };

  /*
  * The `handleSubmit` function is responsible for handling the submission of the login form.
  *
  * Form Validation and Login:
  * - When the user submits the login form, this function is triggered.
  * - It prevents the default form submission to handle the process programmatically.
  * - It performs validation checks on the entered email and password using regex patterns (`emailRegex` and `passwordRegex`).
  * - If either the email or password fails validation, the corresponding error state (`emailError` or `passwordError`) is set to `true`.
  * - If both email and password are valid, it sends a POST request to the server's login endpoint.
  * - If the server responds with an OK status, the user's access token is stored in the local storage.
  * - The user's email is also stored for future reference.
  * - Depending on whether the user is an admin or not, they are redirected to different pages (`/home` for admin, `/dashboard` for others).
  * - In case of a login failure, an alert is shown with an appropriate message.
  * - If any unexpected errors occur during the process, another alert is displayed.
  *
  * This function enhances user experience by validating the form inputs, providing login feedback,
  * and allowing the user to securely access their account information.
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;

    if (!email || !emailRegex.test(email)) {
      setEmailError(true);
      isValid = false;
    }

    if (!password || !passwordRegex.test(password)) {
      setPasswordError(true);
      isValid = false;
    }

    if (isValid) {
      try {
        setIsLoading(true);
        const response = await fetch(HOSTED_BASE_URL + '/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (response.ok) {
          setIsLoading(false);
          const data = await response.json();
          localStorage.setItem('accessToken', data.token);
          localStorage.setItem('data', data)
          // Show an alert for login success
          localStorage.setItem('userEmail', email);
          if (email === adminEmail) {
            navigate('/home');
          } else {
            // Show an alert for login success
            navigate("/dashboard");
          }          // You can also navigate to a different page on successful login using useNavigate()
          // navigate("/dashboard");
        } else {
          setIsLoading(false);
          // Show an alert for login failure
          alert('Login failed. Please check your credentials and try again.');
        }
      } catch (error) {
        setIsLoading(false);
        console.error('Error during login:', error);
        // Show an alert for any unexpected errors
        alert('An error occurred during login. Please try again later.');
      }
    }
  };

  /**
   * For mobile screens
   */
  const isWideScreen = useMediaQuery('(min-width:768px)');

  return (
    <>
      <Navbar />
      <Container maxWidth="md" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "64px" }}>
        <Grid container spacing={0}>
          {/* Code for the wide screen (if needed) */}
          {isWideScreen ? (
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', bgcolor: 'black', padding: 3 }}>
                <Typography variant="h3" style={{ alignSelf: 'center', textAlign: 'center' }} color="beige" gutterBottom>
                  Not a Member?
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '7vh', paddingBottom: '5.5vh', color: 'beige' }}>
                  <Typography variant="body1" gutterBottom>
                    Join our community today! Sign up to unlock a world of benefits and elevate your shopping experience.
                  </Typography>
                  <Typography variant="body1" gutterBottom>Gain access to exclusive offers, early access to sales, and more.</Typography>
                  <Typography variant="body1" gutterBottom>Don't miss out on the opportunity to be a part of our growing community.</Typography>
                  <Typography variant="body1" gutterBottom>Sign up now and start discovering a world of possibilities!</Typography>
                </div>
                <Button variant="outlined" style={{ alignSelf: 'center', backgroundColor: 'beige', color: 'black', borderColor: 'black', fontWeight: 'bold' }} sx={{ width: '80%' }} onClick={handleSignup}>
                  Sign Up
                </Button>
              </Box>
            </Grid>
          ) : null}

          {/* Log In Component */}
          <Grid item xs={12} sm={isWideScreen ? 6 : 12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', bgcolor: 'beige', padding: 3 }}>
              <form style={{ display: 'flex', flexDirection: 'column', width: '100%' }} onSubmit={handleSubmit}>
                <Typography variant="h3" style={{ alignSelf: 'center' }} gutterBottom>
                  Log In
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '5vh', paddingBottom: '7vh', color: 'beige' }}>
                  <TextField
                    helperText="Please enter a valid email"
                    fullWidth
                    required
                    id="outlined-required"
                    label="Email"
                    margin="dense"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    error={emailError}
                  />
                  <TextField
                    helperText="Please enter your password (min 8 characters with at least one number, one special character, and one capital letter)"
                    fullWidth
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    margin="dense"
                    value={password}
                    onChange={handlePasswordChange}
                    error={passwordError}
                  />
                  {passwordStrength.length > 0 && (
                    <Typography variant="body1" gutterBottom style={{ color: 'red' }}>
                      {passwordStrength.join(', ')}
                    </Typography>
                  )}
                  {isLoading ? (
                    <CircularProgress style={{ alignSelf: 'center', marginTop: '1rem' }} />
                  ) : (
                    <Button variant="outlined" style={{ alignSelf: 'center', backgroundColor: 'black', color: 'beige', borderColor: 'beige', fontWeight: 'bold', marginTop: '3vh' }} fullWidth type="submit">
                      Submit
                    </Button>
                  )}
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Login;