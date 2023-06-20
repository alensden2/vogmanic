import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, CssBaseline, IconButton, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router";

const drawerWidth = 240;


const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Navbar = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();
  const handleRoutes = (route) => {
    navigate(route);
  };
  const handleDrawerClose = () => {
    onToggle();
  };

  const trigger = useScrollTrigger({ threshold: 100 });

  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBarStyled
          position="fixed"
          open={isOpen}
          sx={{
            backgroundColor: "white",
            transform: trigger ? "translateY(-100%)" : "translateY(0)",
            transition: "transform 0.3s ease",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerClose}
              edge="start"
              sx={{ mr: 2, ...(isOpen && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontFamily: "Lobster",
                fontSize: "1.5rem",
                color: "black",
              }}
            >
              VogueManic
            </Typography>
          </Toolbar>
        </AppBarStyled>
      </Box>
    </React.Fragment>
  );
};

export default Navbar;

// referene navbar - https://mui.com/material-ui/react-app-bar/
// reference side bar - https://mui.com/material-ui/react-drawer/
// font reference -<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
