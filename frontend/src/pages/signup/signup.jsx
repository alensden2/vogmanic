import { Box, TextField, Button, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function SignUp() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box  sx={{display: 'flex', flexDirection:'column' ,justifyContent: 'center', width:'60vh' ,height: '80vh', bgcolor:'black'}}>

        <Typography variant='h3' style={{ alignSelf: 'center' , textAlign: 'center'}} color='beige' gutterBottom> Already a Member?</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',  padding: '7vh',  paddingBottom: '5.5vh', color: 'beige' }}>
          <Typography variant='body1' gutterBottom>Welcome back! Log in to unlock exclusive offers and a seamless shopping experience tailored just for you.</Typography>
          <Typography variant='body1' gutterBottom>Gain access to your saved items, order history, and faster checkout.</Typography>
          <Typography variant='body1' gutterBottom>Don't miss out on the benefits of being a member.</Typography>
          <Typography variant='body1' gutterBottom>Log in now and let's continue shopping together!</Typography>
        </div>
        <Button variant='outlined'style={{ alignSelf: 'center', backgroundColor:'beige' , color:'black', borderColor:'black', fontWeight:'bold'}} sx={{ width: '80%' }}>Log In</Button>
        
      </Box>
    <Box sx={{display: 'flex', flexDirection:'column' ,justifyContent: 'center', alignItems: 'center', width:'60vh' ,height: '80vh', bgcolor:'beige'}} >
      <form style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
        <Typography variant='h3' style={{ alignSelf: 'center' }} gutterBottom >Sign Up</Typography>

        <TextField helperText="Please enter your email" fullWidth required id="outlined-required" label="Email" margin="dense" type="email"/>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="Birthday" slotProps={{ textField: { helperText: ' Please enter your birthday as MM/DD/YYYY', fullWidth:true},}}/>
          </DemoContainer>
        </LocalizationProvider>

        <TextField helperText="Please enter your password" fullWidth required id="outlined-password-input" label="Password" type="password" autoComplete="current-password" margin="dense"/>

        <TextField helperText="Please re-enter your password to confirm password" fullWidth required id="outlined-password-input" label="Confirm Password" type="password" autoComplete="current-password" margin="dense"/>

        <Button variant='outlined'style={{ alignSelf: 'center', backgroundColor:'black', color:'beige' , borderColor:'beige', fontWeight:'bold'}} fullWidth>  Submit </Button>
      </form>
    </Box>
    </div>
  );
}

export default SignUp;