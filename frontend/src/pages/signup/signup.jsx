import React, { useState } from 'react';
import { useMediaQuery, Box, TextField, Button, Typography, Grid, Container } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [birthdateError, setBirthdateError] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState([]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const navigate=useNavigate()
  const handleLogin =()=>{
    navigate("/login")
  }

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setEmailError(!emailRegex.test(inputEmail));
  };

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

  const handleConfirmPasswordChange = (event) => {
    const inputConfirmPassword = event.target.value;
    setConfirmPassword(inputConfirmPassword);
    setConfirmPasswordError(inputConfirmPassword !== password);
  };

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
        const response = await fetch('https://voguemanic-be.onrender.com/users/signup', {
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
          console.log('Signup success!');
          // Show an alert for signup success
          navigate("/login")
        } else {
          console.log('Signup failed.');
          // Show an alert for signup failure
          alert('Signup failed. Please check your input and try again.');
        }
      } catch (error) {
        console.error('Error during signup:', error);
        // Show an alert for any unexpected errors
        alert('An error occurred during signup. Please try again later.');
      }
    }
  };

  const isWideScreen = useMediaQuery('(min-width:768px)');

  const handleBirthdateChange = (date) => {
    setBirthdate(date);
    setBirthdateError(false);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"64px" }}>
        <Grid container spacing={0}>
          {/* Code for the wide screen (if needed) */}
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

          {/* Code for the sign-up section */}
          <Grid item xs={12} sm={isWideScreen ? 6 : 12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', bgcolor: 'beige', padding: 3 }}>
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
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default SignUp;
