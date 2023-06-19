import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BadgeIcon from "@mui/icons-material/Badge";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import MenuIcon from "@mui/icons-material/Menu";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { AppBar, Box, CssBaseline, IconButton, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router";

const drawerWidth = 240;
const icons = [
  <DashboardIcon />,
  <ShowChartIcon />,
  <Inventory2Icon />,
  <AttachMoneyIcon />,
  <HomeIcon />,
  <BadgeIcon />,
];
const routes = [
  "/dashboard",
  "/statistics",
  "/inventory",
  "/sales",
  "/home",
  "/employees",
];

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
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
