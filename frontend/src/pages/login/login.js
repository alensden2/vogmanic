import { Box, TextField, Button, Typography } from '@mui/material';
import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState([]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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

  const handleSubmit = (event) => {
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
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Is valid:', isValid);
      // Perform your login action here
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {/* Sign Up Component - Visible only for screen sizes larger than 768px */}
      <Box
        sx={{
          display: 'none',
          width: '50%', // Adjust the width percentage as per your preference
          height: '80vh',
          bgcolor: 'black',
          '@media (min-width: 768px)': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%', // Adjust the width percentage as per your preference
            height: '80vh',
          },
        }}
      >
        <Typography variant="h3" style={{ alignSelf: 'center', textAlign: 'center' }} color="beige" gutterBottom>
          Not a Member?
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '7vh', paddingBottom: '5.5vh', color: 'beige' }}>
          <Typography variant="body1" gutterBottom>
            Join our community today! Sign up to unlock a world of benefits and elevate your shopping experience.
          </Typography>
          <Typography variant="body1" gutterBottom>Gain access to exclusive offers, early access to sales, and more.</Typography>
          <Typography variant="body1" gutterBottom>Don't miss out on the opportunity to be a part of our growing community.</Typography>
          <Typography variant="body1" gutterBottom>Sign up now and start discovering a world of possibilities!</Typography>
        </Box>
        <Button variant="outlined" style={{ alignSelf: 'center', backgroundColor: 'beige', color: 'black', borderColor: 'black', fontWeight: 'bold' }} sx={{ width: '80%' }}>
          Sign Up
        </Button>
      </Box>

      {/* Log In Component */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%', // Adjust the width percentage as per your preference
          height: '80vh',
          bgcolor: 'beige',
          '@media (min-width: 768px)': {
            width: '50%', // Adjust the width percentage as per your preference
            height: '80vh',
          },
        }}
      >
        <form style={{ display: 'flex', flexDirection: 'column', width: '80%' }} onSubmit={handleSubmit}>
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
    </Box>
  );
}

export default App;
