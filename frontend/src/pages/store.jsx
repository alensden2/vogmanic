import { Box } from "@mui/material";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

function Store() {
    return <>
        <Box>
            <Navbar />
            <Box sx={{padding:"20pxs", marginTop:"20rem", marginBottom: "20rem", textAlign:"center"}}>
                <h1>The main store</h1>

            </Box>
            <Footer />
        </Box>

    </>
}

export default Store;