import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Box, Grid, Typography, IconButton, Paper, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";

const ContainerStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  flex: '1 0 auto',
  backgroundColor: "white",
}));

const ContactItem = ({ icon: Icon, title, children }) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} md={6} lg={3} textAlign="center">
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <IconButton
        aria-label={title}
        color="primary" 
        component="a"
        href={title === "CALL US" ? "tel:+11234567890" : ""} 
      >
        <Icon />
      </IconButton>
      <Typography variant="subtitle1" sx={{ marginTop: theme.spacing(1) }}>{children}</Typography>
    </Grid>
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
          </Paper>
        </ContainerStyled>
        <Footer sx={{ flexShrink: 0 }} />
      </Box>
    </>
  );
};

export default ContactPage;
