/**
 * Navbar Component
 *
 * This component represents the navigation bar of the VogueManic website.
 * It includes an AppBar with various navigation links, a responsive menu for smaller screens,
 * and optional logout button for authenticated users.
 *
 * @param {boolean} isOpen - Indicates whether the sidebar is open.
 * @param {Function} onToggle - Function to toggle the sidebar.
 * @returns {React Component} - The rendered navigation bar component.
 */

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

/**
 * Styled AppBar Component
 *
 * This styled component enhances the Material-UI AppBar by applying custom styles.
 * It handles the transition of the AppBar's width and margin, ensuring smooth animation
 * when opening and closing the sidebar. It also adjusts the z-index to ensure proper
 * layering with the drawer component.
 *
 * @param {boolean} open - Indicates whether the sidebar is open.
 * @returns {Styled Component} - The styled AppBar component with custom styles.
 */

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  /**
   * Handle closing the sidebar
   */
  const handleDrawerClose = () => {
    onToggle();
  };
  /**
   * Open the mobile menu
   */
  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
  };
  /**
   * Close the mobile menu
   */
  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };
  /**
   * Scroll trigger for hiding the AppBar
   */
  const trigger = useScrollTrigger({ threshold: 100 });
  /**
   * Handle navigation to a specific path and close the mobile menu
   *
   * @param {string} path - The path to navigate to.
   */
  const handleNavigation = (path) => {
    navigate(path);
    handleMobileMenuClose();
  };
  /**
   * Handle user logout by removing the access token and navigating to the home page
   */
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };
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
                flexGrow: 1,
                cursor: "pointer",
              }}
              onClick={() => handleNavigation("/")}
            >
              VogueManic
            </Typography>
            <Hidden mdDown>
              <Stack direction="row" spacing={2}>
                <IconButton
                  color="inherit"
                  onClick={() => handleNavigation("/products")}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      cursor: "pointer",
                      color: "black",
                      fontWeight: 500,
                    }}
                  >
                    Products
                  </Typography>
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => handleNavigation("/order")}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      cursor: "pointer",
                      color: "black",
                      fontWeight: 500,
                    }}
                  >
                    Orders
                  </Typography>
                </IconButton><IconButton
                  color="inherit"
                  onClick={() => handleNavigation("/dashboard")}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      cursor: "pointer",
                      color: "black",
                      fontWeight: 500,
                    }}
                  >
                    Dashboard
                  </Typography>
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => handleNavigation("/resale")}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      cursor: "pointer",
                      color: "black",
                      fontWeight: 500,
                    }}
                  >
                    Resale
                  </Typography>
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => handleNavigation("/wishlist")}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      cursor: "pointer",
                      color: "black",
                      fontWeight: 500,
                    }}
                  >
                    Wishlist
                  </Typography>
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => handleNavigation("/contact")}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      cursor: "pointer",
                      color: "black",
                      fontWeight: 500,
                    }}
                  >
                    Contact Us
                  </Typography>
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => handleNavigation("/faq")}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      cursor: "pointer",
                      color: "black",
                      fontWeight: 500,
                    }}
                  >
                    FAQs
                  </Typography>
                </IconButton>
              </Stack>
            </Hidden>
            <Hidden lgUp>
              <IconButton
                color="inherit"
                aria-label="open mobile menu"
                onClick={handleMobileMenuOpen}
                sx={{ ml: "auto", color: "black" }}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            {localStorage.getItem("accessToken") && (
              <Hidden mdDown>
                <IconButton
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ color: "black" }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      cursor: "pointer",
                      color: "black",
                      fontWeight: 500,
                    }}
                  >
                    Logout
                  </Typography>
                </IconButton>
              </Hidden>
            )}
          </Toolbar>
        </AppBarStyled>
        <Hidden lgUp>
          <Drawer
            anchor="right"
            open={mobileMenuOpen}
            onClose={handleMobileMenuClose}
          >
            <Stack
              direction="column"
              sx={{ width: drawerWidth, p: 2 }}
              spacing={2}
            >
              <IconButton
                color="inherit"
                onClick={() => handleNavigation("/contact")}
              >
                <Typography
                  variant="body1"
                  sx={{
                    cursor: "pointer",
                    color: "black",
                    fontWeight: 500,
                  }}
                >
                  Contact Us
                </Typography>
              </IconButton>
              <IconButton
                color="inherit"
                onClick={() => handleNavigation("/faq")}
              >
                <Typography
                  variant="body1"
                  sx={{
                    cursor: "pointer",
                    color: "black",
                    fontWeight: 500,
                  }}
                >
                  FAQs
                </Typography>
              </IconButton>
              <IconButton
                color="inherit"
                onClick={() => handleNavigation("/store")}
              >
                <Typography
                  variant="body1"
                  sx={{
                    cursor: "pointer",
                    color: "black",
                    fontWeight: 500,
                  }}
                >
                  Store
                </Typography>
              </IconButton>
            </Stack>
          </Drawer>
        </Hidden>
      </Box>
    </React.Fragment>
  );
};
export default Navbar;

// referene navbar - https://mui.com/material-ui/react-app-bar/
// reference side bar - https://mui.com/material-ui/react-drawer/
// font reference -<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
// Navbar from - https://git.cs.dal.ca/alen/csci-5709-individual-b00930528-alen-john/-/blob/main/Assignments/assignment1/src/components/Navbar/navbar.jsx
