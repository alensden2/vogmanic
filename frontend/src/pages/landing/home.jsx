import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import resale from "../../assets/Resale.jpeg";
import discounts from "../../assets/discount.jpeg";
import rent from "../../assets/rent.jpeg";
import collections from "../../assets/resized image 1.jpeg";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import "./home.css";

function Home() {
  const imageRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const imageBottomPosition =
        imageRef.current.offsetTop + imageRef.current.offsetHeight;

      if (scrollPosition >= imageBottomPosition) {
        console.log("Reached image bottom");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Box>
        <Box sx={{ marginBottom: "2rem" }}>
          <Navbar />
        </Box>
        <Box className="container">
          <Box>
            <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "20px", fontSize: "32px", fontWeight: "bold", letterSpacing: "-1px" }}>
              Shop at Vogmanic for all your fashion desires!
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center", marginBottom: "20px", fontSize: "18px", letterSpacing: "0.2px", color: "#666" }}>
              We have the latest and greatest collection at our webstore. You can also sell and rent new clothes as we believe in the concept of fast fashion. Moreover, hassle-free returns!
            </Typography>
            <img
              src={collections}
              alt="Fashion"
              className="full-screen-image"
              ref={imageRef}
              style={{ width: "100%", height: "auto" }} // Added styling to make the image responsive
            />
          </Box>
          <Box sx={{ textAlign: "center", padding: "20px" }}>
            <Typography variant="h4" sx={{ fontSize: "28px", fontWeight: "bold", letterSpacing: "-0.8px" }}>Trendy Collections!</Typography>
          </Box>
          <Box>
            <img
              src={resale}
              alt="Fashion"
              className="full-screen-image"
              ref={imageRef}
              style={{ width: "100%", height: "auto" }} // Added styling to make the image responsive
            />
          </Box>
          {/* Add other image sections here */}
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
}

export default Home;
