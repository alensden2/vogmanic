import { Box, Grid, IconButton, Paper, TextField, Typography, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const ContainerStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  flex: '1 0 auto',
  backgroundColor: "white",
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  alignSelf: 'center',
  backgroundColor: 'beige',
  color: 'black',
  borderColor: 'black',
  fontWeight: 'bold',
}));


const ContactItem = ({ icon: Icon, title, children }) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} md={6} lg={3} textAlign="center">
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <StyledIconButton
        aria-label={title}
        color="primary"
        component="a"
        href={title === "CALL US" ? "tel:+11234567890" : ""}
      >
        <Icon />
      </StyledIconButton>
      <Typography variant="subtitle1" sx={{ marginTop: theme.spacing(1) }}>{children}</Typography>
    </Grid>
  );
};

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }

    setEmail("");
    setMessage("");
    setEmailError(false);
    setIsDialogOpen(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          helperText={emailError ? "Invalid email" : ""}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Message"
          value={message}
          onChange={handleMessageChange}
          multiline
          fullWidth
          margin="normal"
          required
        />
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <Button variant="contained" type="submit">
            Send Message
          </Button>
        </Box>
      </form>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Message Sent</DialogTitle>
        <DialogContent>
          <Typography>Your email has been sent successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ContainerStyled>
          <Typography variant="h4" gutterBottom textAlign="center">
            Contact Us
          </Typography>
          <Paper elevation={3} sx={{ padding: '2rem', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <Grid container spacing={4} direction="column" alignItems="center" justifyContent="center">
              <ContactItem title="CALL US" icon={PhoneIcon}>
                +1 123 456 7890
              </ContactItem>
              <ContactItem title="BY EMAIL" icon={EmailIcon}>
                contact@voguemanic.com
              </ContactItem>
              <ContactItem title="Return Address" icon={HomeIcon}>
                Dalhousie University, 6299 South St, Halifax, NS B3H 4R2
              </ContactItem>
              <ContactItem title="Mailing Address" icon={HomeIcon}>
                Dalhousie University, 6299 South St, Halifax, NS B3H 4R2
              </ContactItem>
            </Grid>
            <Box sx={{ marginTop: '2rem' }}>
              <ContactForm />
            </Box>
          </Paper>
        </ContainerStyled>
        <Footer sx={{ flexShrink: 0 }} />
      </Box>
    </>
  );
};

export default ContactPage;

// reference mui text field https://mui.com/material-ui/react-text-field/