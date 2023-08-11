/**
 * AdminNavbar Component
 *
 * This component represents the navigation bar for the VogueManic admin panel.
 * It includes an AppBar with a menu button, application title, and optional logout button,
 * along with a persistent Drawer for navigation links.
 *
 * It uses Material-UI components for styling and user interactions.
 */
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BadgeIcon from "@mui/icons-material/Badge";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Drawer, Toolbar, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";

// Constants for the admin navbar
const drawerWidth = 240;
const icons = [
  <Inventory2Icon />,
  <AttachMoneyIcon />,
  <HomeIcon />,
  <BadgeIcon />,
];
const routes = [
  "/inventory",
  "/sales",
  "/home",
  "/employees",
];
/**
 * Custom styled AppBar, inheriting styles from Material-UI AppBar
 * Control whether to forward specific props or not
 */
const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
  // Styling function that receives 'theme' and 'open' as arguments
})(({ theme, open }) => ({
  // Transition styles for the opening and closing animations of the AppBar
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // If the 'open' prop is true (Drawer is open), adjust the width and margin
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

/**
 * Styled component for the header section of the Drawer
 */
const DrawerHeader = styled("div")(({ theme }) => ({
  // Flex display and alignment settings
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

/**
 * Admin-navbar Main component
 * 
 * @param {state of side bar} param0 : Renders the side bar
 * @returns The main navbar component
 */
const AdminNavbar = ({ isOpen, onToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("accessToken");

  /**
   * Navigates to clicked route
   * @param {Route} route 
   */
  const handleRoutes = (route) => {
    navigate(route);
  };

  /**
   * Handles the drawer movements
   */
  const handleDrawerClose = () => {
    onToggle();
  };

  /**
   * Removes the accessToken and logs out the admin
   * Navigates to the home page after wards
   */
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBarStyled
        position="fixed"
        open={isOpen}
        sx={{ backgroundColor: "white" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerClose}
            edge="start"
            sx={{ mr: 2, ...(isOpen && { display: "none" }) }}
          >
            <MenuIcon sx={{ color: "black" }} />
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
          {isAuthenticated && (
            <IconButton
              color="inherit"
              aria-label="logout"
              onClick={handleLogout}
              edge="end"
              sx={{ ml: "auto", color: "black" }}
            >
              Logout
            </IconButton>
          )}
        </Toolbar>
      </AppBarStyled>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={isOpen}
      >
        <DrawerHeader>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", marginRight: "auto" }}
            >
              Admin Panel
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
        </DrawerHeader>
        <Divider />
        <List>
          {["Inventory", "Sales", "Home", "Employees"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  handleRoutes(routes[index]);
                }}
              >
                <ListItemIcon>{icons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default AdminNavbar;

// Reference for AppBar: https://mui.com/material-ui/react-app-bar/
// Reference for Drawer: https://mui.com/material-ui/react-drawer/
// Font Reference: <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
// Navbar Example Reference: https://git.cs.dal.ca/alen/csci-5709-individual-b00930528-alen-john/-/blob/main/Assignments/assignment1/src/components/Navbar/navbar.jsx