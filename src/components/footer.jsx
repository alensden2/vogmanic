import { AppBar, Box, CssBaseline, IconButton, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Footer = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "auto" }}>
        <AppBarStyled
          position="static"
          color="default"
          sx={{ 
            backgroundColor: "white",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="body1"
              color="textPrimary"
              sx={{
                fontFamily: "Lobster",
                fontSize: "1rem",
                color: "black",
              }}
            >
              © 2023 VogueManic. All rights reserved.
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
          </Toolbar>
        </AppBarStyled>
      </Box>
    </React.Fragment>
  );
};

export default Footer;
