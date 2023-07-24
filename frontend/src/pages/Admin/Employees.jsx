import Box from "@mui/material/Box";
import React, { useState } from "react";
import AdminHomePage from "./AdminHomePage";

const Employees = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      <Box>
        <AdminHomePage isOpen={isNavbarOpen} onToggle={handleNavbarToggle} />
        <Box sx={{ ml: isNavbarOpen ? "240px" : 0, p: 3, marginTop: "64px" }}>
          <h1>Employees page</h1>
        </Box>
      </Box>
    </>
  );
};

export default Employees;
