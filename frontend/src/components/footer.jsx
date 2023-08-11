/**
 * Footer Component
 *
 * This component represents the footer section of the VogueManic website.
 * It displays social media links, such as LinkedIn, Facebook, and Twitter,
 * and includes a copyright notice for the current year and brand name.
 *
 * @returns {React Component} - The rendered footer component.
 */

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

/**
 * Styling for the footer
 */
const FooterStyled = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 'auto'
}));

const Footer = () => {
  return (
    <FooterStyled>
      <Typography variant="h6" gutterBottom>
        Follow us on social media
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <IconButton color="inherit" aria-label="LinkedIn">
          <LinkedInIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="Facebook">
          <FacebookIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="Twitter">
          <TwitterIcon />
        </IconButton>
      </Box>
      <Typography variant="body2" color="text.secondary" align="center" style={{marginTop: '15px'}}>
        © 2023 VogueManic, All rights reserved.
      </Typography>
    </FooterStyled>
  );
};

export default Footer;
