/*
 * The `SignUp` component provides a user registration form for signing up new users.
 *
 * Core Functionality:
 * - Captures user input for email, password, and birthdate.
 * - Validates email format, password complexity, and birthdate validity.
 * - Displays password strength requirements and error messages.
 * - Submits user registration data to the backend for account creation.
 * - Navigates to the login page upon successful registration.
 *
 * Features:
 * - Utilizes Material-UI components for a clean and responsive design.
 * - Implements adaptive layout for wide and narrow screens.
 * - Utilizes date picker for selecting and validating birthdate.
 * - Displays informative helper texts and error messages for input fields.
 * - Dynamically calculates and displays password strength requirements.
 * - Provides a visually appealing and user-friendly signup process.
 * - Handles form submission and communicates with the backend server.
 * - Offers a seamless navigation experience with links to the login page.
 */
import { Box, Button, Container, Grid, TextField, Typography, useMediaQuery, CircularProgress } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import { HOSTED_BASE_URL } from '../../constants';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [birthdateError, setBirthdateError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState([]);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const navigate = useNavigate()

  /*
   * The `handleLogin` function navigates the user to the login page.
   *
   * Functionality:
   * - Initiates navigation to the login page using the `useNavigate` hook.
   * - Allows users to easily switch to the login page for existing members.
   * - Provides a smooth user experience by maintaining consistent navigation.
   */
  const handleLogin = () => {
    navigate("/login")
  }

  /*
   * The `handleEmailChange` function handles changes to the email input field.
   *
   * Functionality:
   * - Updates the `email` state with the input value from the email field.
   * - Validates the email format using a regular expression.
   * - Sets the `emailError` state based on whether the email format is valid.
   *
   * @param {Object} event - The event object containing the input value.
   */
  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setEmailError(!emailRegex.test(inputEmail));
  };

  /*
   * The `handlePasswordChange` function handles changes to the password input field.
   *
   * Functionality:
   * - Updates the `password` state with the input value from the password field.
   * - Validates the password format using a regular expression.
   * - Updates the `passwordError` state based on whether the password format is valid.
   * - Calculates and updates `passwordStrength` based on password complexity criteria.
   *
   * @param {Object} event - The event object containing the input value.
   */
  const handlePasswordChange = (event) => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
    setPasswordError(!passwordRegex.test(inputPassword));

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
   * The `handleConfirmPasswordChange` function handles changes to the confirm password input field.
   *
   * Functionality:
   * - Updates the `confirmPassword` state with the input value from the confirm password field.
   * - Compares the input value with the current password and updates `confirmPasswordError` accordingly.
   *
   * @param {Object} event - The event object containing the input value.
   */
  const handleConfirmPasswordChange = (event) => {
    const inputConfirmPassword = event.target.value;
    setConfirmPassword(inputConfirmPassword);
    setConfirmPasswordError(inputConfirmPassword !== password);
  };

  /*
   * The `handleSubmit` function handles the form submission for user signup.
   *
   * Functionality:
   * - Prevents the default form submission behavior.
   * - Validates user input for email, password, confirm password, and birthdate.
   * - If all input is valid, sends a POST request to the server to create a new user.
   * - Displays success or failure messages based on the response from the server.
   *
   * @param {Object} event - The event object representing the form submission.
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

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      isValid = false;
    }

    if (!birthdate) {
      setBirthdateError(true);
      isValid = false;
    }

    if (isValid) {
      try {
        setIsLoading(true);
        const response = await fetch(`${HOSTED_BASE_URL}/users/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            confirmPassword,
            birthdate,
          }),
        });

        if (response.ok) {
          setIsLoading(false);
          // Show an alert for signup success
          navigate("/login")
        } else {
          setIsLoading(false);
          // Show an alert for signup failure
          alert('Signup failed. User already exists');
        }
      } catch (error) {
        setIsLoading(false);
        console.error('Error during signup:', error);
        // Show an alert for any unexpected errors
        alert('An error occurred during signup. Please try again later.');
      }
    }
  };

  /**
   * Wide screen handle
   */
  const isWideScreen = useMediaQuery('(min-width:768px)');

  /*
   * The `handleBirthdateChange` function handles the change of the birthdate value in the date picker.
   *
   * Functionality:
   * - Compares the selected birthdate with the current date.
   * - If the selected birthdate is in the future, sets a birthdate error and displays an alert.
   * - Otherwise, updates the birthdate state and clears the birthdate error.
   *
   * @param {Date} date - The selected birthdate from the date picker.
   */
  const handleBirthdateChange = (date) => {
    const today = new Date();

    if (date > today) {
      setBirthdateError(true); // Set birthdate error
      alert("Birthday date is invalid")
    } else {
      setBirthdate(date);
      setBirthdateError(false);
    }
  };
  return (
    <>
      <Navbar />
      <Container maxWidth="md" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "64px" }}>
        <Grid container spacing={0}>
          {isWideScreen ? (
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', bgcolor: 'black', padding: 3 }}>
                <Typography variant="h3" style={{ alignSelf: 'center', textAlign: 'center' }} color="beige" gutterBottom>
                  Already a Member?
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '7vh', paddingBottom: '5.5vh', color: 'beige' }}>
                  <Typography variant="body1" gutterBottom>
                    Welcome back! Log in to unlock exclusive offers and a seamless shopping experience tailored just for you.
                  </Typography>
                  <Typography variant="body1" gutterBottom>Gain access to your saved items, order history, and faster checkout.</Typography>
                  <Typography variant="body1" gutterBottom>Don't miss out on the benefits of being a member.</Typography>
                  <Typography variant="body1" gutterBottom>Log in now and let's continue shopping together!</Typography>
                </div>
                <Button variant="outlined" style={{ alignSelf: 'center', backgroundColor: 'beige', color: 'black', borderColor: 'black', fontWeight: 'bold' }} sx={{ width: '80%' }} onClick={handleLogin}>
                  Log In
                </Button>
              </Box>
            </Grid>
          ) : null}
          <Grid item xs={12} sm={isWideScreen ? 6 : 12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', bgcolor: 'beige', padding: 3 }}>
              {/* Conditional rendering for the loader */}
              {isLoading ? (
                <CircularProgress color="primary" /> // Display the loader (loading spinner)
              ) : (
                <form style={{ display: 'flex', flexDirection: 'column', width: '100%' }} onSubmit={handleSubmit}>
                  <Typography variant="h3" style={{ alignSelf: 'center' }} gutterBottom>
                    Sign Up
                  </Typography>
                  <TextField
                    helperText="Please enter your email"
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Birthday"
                      slotProps={{ textField: { helperText: 'Please enter your birthday as MM/DD/YYYY', fullWidth: true } }}
                      value={birthdate}
                      onChange={handleBirthdateChange}
                      error={birthdateError}
                    />
                  </LocalizationProvider>
                  <TextField
                    helperText="Please enter your password (min 8 characters with at least one number, one special character, and one capital letter)"
                    fullWidth
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    margin="dense"
                    value={password}
                    onChange={handlePasswordChange}
                    error={passwordError}
                  />
                  <TextField
                    helperText="Please re-enter your password to confirm password"
                    fullWidth
                    required
                    id="outlined-password-input-confirm"
                    label="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                    margin="dense"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={confirmPasswordError}
                  />
                  {passwordStrength.length > 0 && (
                    <Typography variant="body1" gutterBottom style={{ color: 'red' }}>
                      {passwordStrength.join(', ')}
                    </Typography>
                  )}
                  <Button variant="outlined" style={{ alignSelf: 'center', backgroundColor: 'black', color: 'beige', borderColor: 'beige', fontWeight: 'bold', marginTop: 10 }} fullWidth type="submit">
                    Submit
                  </Button>
                </form>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default SignUp;