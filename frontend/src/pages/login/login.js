import { Box, Button, Container, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import { HOSTED_BASE_URL } from '../../constants';

function Login() {
  const [email, setEmail] = useState('');
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

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setEmailError(!emailRegex.test(inputEmail));
  };

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
        const response = await fetch(HOSTED_BASE_URL+'/users/login', {
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
          console.log('Login success!');

          const data = await response.json();
          console.log(data);
          localStorage.setItem('accessToken', data.token);
          localStorage.setItem('data', data)
          console.log(localStorage.getItem('data'));
          console.log(localStorage.getItem('accessToken'))
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
          console.log('Login failed.');
          // Show an alert for login failure
          alert('Login failed. Please check your credentials and try again.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        // Show an alert for any unexpected errors
        alert('An error occurred during login. Please try again later.');
      }
    }
  };

  const isWideScreen = useMediaQuery('(min-width:768px)');

  return (
    <>
      <Navbar/>
      <Container maxWidth="md" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"64px"}}>
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
                  <Button variant="outlined" style={{ alignSelf: 'center', backgroundColor: 'black', color: 'beige', borderColor: 'beige', fontWeight: 'bold', marginTop: '3vh' }} fullWidth type="submit">
                    Submit
                  </Button>
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </>
  );
}

export default Login;
