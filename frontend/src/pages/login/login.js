import { Box, TextField, Button, Typography } from '@mui/material';

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box  sx={{display: 'flex', flexDirection:'column' ,justifyContent: 'center', width:'60vh' ,height: '80vh', bgcolor:'black'}}>
        <Typography variant='h3' style={{ alignSelf: 'center' , textAlign: 'center'}} color='beige' gutterBottom> Not a Member?</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',  padding: '7vh',  paddingBottom: '5.5vh', color: 'beige' }}>
          <Typography variant='body1' gutterBottom>Join our community today! Sign up to unlock a world of benefits and elevate your shopping experience. </Typography>
          <Typography variant='body1' gutterBottom>Gain access to exclusive offers, early access to sales, and more. </Typography>
          <Typography variant='body1' gutterBottom>Don't miss out on the opportunity to be a part of our growing community.</Typography>
          <Typography variant='body1' gutterBottom>Sign up now and start discovering a world of possibilities!</Typography>
        </div>
        <Button variant='outlined'style={{ alignSelf: 'center', backgroundColor:'beige' , color:'black', borderColor:'black', fontWeight:'bold'}} sx={{ width: '80%' }}>Log In</Button>
        
      </Box>
    <Box sx={{display: 'flex', flexDirection:'column' ,justifyContent: 'center', alignItems: 'center', width:'60vh' ,height: '80vh', bgcolor:'beige'}} >
      <form style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
        <Typography variant='h3' style={{ alignSelf: 'center' }} gutterBottom >Log In </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',  paddingTop: '9vh', paddingBottom: '11vh', color: 'beige' }}>
          <TextField helperText="Please enter your email" fullWidth required id="outlined-required" label="Email" margin="dense" type="email"/>
          <TextField helperText="Please enter your password" fullWidth required id="outlined-password-input" label="Password" type="password" autoComplete="current-password" margin="dense"/>
        </div>
        <Button variant='outlined'style={{ alignSelf: 'center', backgroundColor:'black', color:'beige' , borderColor:'beige', fontWeight:'bold'}} fullWidth>  Submit </Button>
      </form>
    </Box>
    </div>
  );
}

export default App;
