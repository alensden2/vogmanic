/**
 * This page component represents the home page of the Vogmanic webstore.
 * It showcases a variety of fashion-related content and features, including:
 *
 * - A dynamic scrolling effect triggered by the user's scroll position.
 * - Introduction to the Vogmanic webstore's offerings and philosophy.
 * - Display of a captivating image collection representing the latest fashion trends.
 * - Section highlighting trendy collections available at the webstore.
 * - Responsive presentation of images to ensure optimal display on various devices.
 * - Integration of navigation elements like the Navbar and Footer components.
 *
 * The component employs Material-UI Typography and Box components for structured layout,
 * as well as custom styling via CSS files. Various fashion-related images are imported
 * to enhance the visual appeal of the page. The dynamic scrolling effect is implemented
 * using the useRef and useEffect hooks to monitor the user's scroll position.
 */

import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import resale from "../../assets/Resale.jpeg";
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
              style={{ width: "100%", height: "auto" }}
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
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
}

export default Home;