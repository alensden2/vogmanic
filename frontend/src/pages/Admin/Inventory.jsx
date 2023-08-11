import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import {
    Box,
    Container,
    Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/adminbar";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// InventoryPage component
const InventoryPage = () => {
    const navigate = useNavigate();
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteFailure, setDeleteFailure] = useState(false);
    const [deletedProductName, setDeletedProductName] = useState("");
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        shipping_cost: "",
        rating: 0,
        category: "",
        image_url: "",
    });
    // Event handler to navigate to the sales page
    const onInfoClick = () => {
        navigate('/sales');
    };

    const [promoDialogOpen, setPromoDialogOpen] = useState(false);
    const [selectedProductForPromo, setSelectedProductForPromo] = useState(null);
    const [discountedPrice, setDiscountedPrice] = useState("");
    // Event handler to toggle the navbar

    const handleNavbarToggle = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const handleSetDiscount = () => {
        if (!discountedPrice || !selectedProductForPromo) {
            return;
        }

        const accessToken = localStorage.getItem("accessToken");
        const headers = { Authorization: `Bearer ${accessToken}` };

        const { productId, productName } = selectedProductForPromo;

        const updatedProduct = {
            name: productName,
            price: discountedPrice
        };

        axios
            .put(`https://voguemanic-be.onrender.com/admin/updateProduct/${productId}`, updatedProduct, { headers })
            .then((response) => {
                // Handle the successful update response as needed
                console.log("Product price updated successfully:", response.data);

                // You can update the local state or perform any other necessary actions
                // For example, update the product's price in the local state
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === productId ? { ...product, price: discountedPrice } : product
                    )
                );
            })
            .catch((error) => {
                // Handle the error
                console.error("Error updating product:", error);
            });

        setPromoDialogOpen(false);
        setDiscountedPrice("");
    };

    // Fetch products data from the server on component mount
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const headers = { Authorization: `Bearer ${accessToken}` };

        axios
            .get("https://voguemanic-be.onrender.com/admin/products", { headers })
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);
    // Event handler to delete a product from the server
    const handleDeleteProduct = (productId, productName) => {

        const accessToken = localStorage.getItem("accessToken");
        const headers = { Authorization: `Bearer ${accessToken}` };

        axios
            .delete(`https://voguemanic-be.onrender.com/admin/deleteProduct/${productId}`, { headers })
            .then((response) => {
                setDeleteSuccess(true);
                setDeleteFailure(false);
                setDeletedProductName(productName);

                setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
            })
            .catch((error) => {
                setDeleteSuccess(false);
                setDeleteFailure(true);
                console.error("Error deleting product:", error);
                setDeletedProductName(productName);
            });
    };

    // Event handler to Promo a product from the server
    const handlePromoProduct = (productId, productName) => {


        setSelectedProductForPromo({ productId, productName });
        console.log("Cliked")


        setPromoDialogOpen(true);

    };
    // Event handler to close the success and failure dialogs

    const handleDialogClose = () => {
        setDeleteSuccess(false);
        setDeleteFailure(false);
    };
    // Event handler to open the add product form

    const handleOpenAddForm = () => {
        setIsAddFormOpen(true);
    };
    // Event handler to close the add product form and reset the input fields

    const handleCloseAddForm = () => {
        setIsAddFormOpen(false);
        setNewProduct({
            name: "",
            description: "",
            price: "",
            shipping_cost: "",
            rating: 0,
            category: "",
            image_url: "",
        });
    };
    // Event handler to add a new product to the server

    const handleAddProduct = () => {

        if (
            !newProduct.name.trim() ||
            !newProduct.description.trim() ||
            !newProduct.price.trim() ||
            !newProduct.shipping_cost.trim() ||
            !newProduct.category ||
            !newProduct.image_url.trim()
        ) {
            handleShowFailureDialog();
            return;
        }

        const accessToken = localStorage.getItem("accessToken");
        const headers = { Authorization: `Bearer ${accessToken}` };

        axios
            .post("https://voguemanic-be.onrender.com/admin/addProduct", newProduct, { headers })
            .then((response) => {
                const addedProduct = response.data;
                setProducts((prevProducts) => [...prevProducts, addedProduct]);
                setDeletedProductName(newProduct.name);
                handleShowSuccessDialog();
                handleCloseAddForm();
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error adding product:", error);
                setDeletedProductName(newProduct.name);
                handleShowFailureDialog();
            });
    };
    // State variables to manage success and failure dialogs

    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showFailureDialog, setShowFailureDialog] = useState(false);
    // Event handlers to show/hide the success and failure dialogs

    const handleShowSuccessDialog = () => {
        setShowSuccessDialog(true);
    };

    const handleShowFailureDialog = () => {
        setShowFailureDialog(true);
    };

    const handleCloseDialogs = () => {
        setShowSuccessDialog(false);
        setShowFailureDialog(false);
    };
    // Return the JSX for rendering the InventoryPage component

    return (
        <>
            <AdminNavbar isOpen={isNavbarOpen} onToggle={handleNavbarToggle} />
            <Box
                sx={{
                    backgroundColor: "#f8f8f8",
                    minHeight: "100vh",
                    pt: "64px",
                    pb: "20px",
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: "20px",
                        }}
                    >
                        {products.map((product) => (
                            <Card
                                key={product._id}
                                sx={{
                                    maxWidth: 300,
                                    height: "100%",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    transition: "transform 0.2s",
                                    "&:hover": {
                                        transform: "scale(1.03)",
                                    },
                                }}
                            >
                                <CardMedia
                                    sx={{ height: 200, width: "100%", borderRadius: "8px 8px 0 0" }}
                                    image={product.image_url}
                                    title={product.name}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        sx={{ fontWeight: "bold", mb: 1 }}
                                    >
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                                        Category: {product.category}
                                    </Typography>
                                    <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                                        Rating:
                                        <Rating
                                            name={`product-rating-${product._id}`}
                                            value={product.rating}
                                            precision={0.5}
                                            readOnly
                                        />
                                    </Typography>
                                    <Typography variant="body2" component="div">
                                        Price: {product.price}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: "center" }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<InfoIcon />}
                                        onClick={onInfoClick}
                                        sx={{ color: "#2196f3" }}
                                    >
                                        Sales
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDeleteProduct(product._id, product.name)}
                                        sx={{ color: "#f44336" }}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<AutoAwesomeIcon />}
                                        onClick={() => handlePromoProduct(product._id, product.name)}
                                        sx={{ color: "#f44336" }}
                                    >
                                        Promo
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                </Container>
            </Box>
            <Dialog open={deleteSuccess} onClose={handleDialogClose}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    {`${deletedProductName} is deleted successfully.`}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>OK</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={promoDialogOpen} onClose={() => setPromoDialogOpen(false)}>
                <DialogTitle style={{ textAlign: "center", paddingBottom: "0" }}>Promotions</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Discounted Price"
                        fullWidth
                        margin="normal"
                        value={discountedPrice}
                        onChange={(e) => setDiscountedPrice(e.target.value)}
                    />
                </DialogContent>
                <DialogActions style={{ justifyContent: "center", paddingTop: "0" }}>
                    <Button onClick={() => setPromoDialogOpen(false)} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSetDiscount} variant="contained" color="primary">
                        Set Discount
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteFailure} onClose={handleDialogClose}>
                <DialogTitle>Failure</DialogTitle>
                <DialogContent>
                    {`${deletedProductName} couldn't be deleted.`}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>OK</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={showSuccessDialog} onClose={handleCloseDialogs}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    {`${deletedProductName} is added successfully.`}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogs}>OK</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={showFailureDialog} onClose={handleCloseDialogs}>
                <DialogTitle>Failure</DialogTitle>
                <DialogContent>
                    {`${deletedProductName} couldn't be added.`}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogs}>OK</Button>
                </DialogActions>
            </Dialog>
            <Fab
                color="primary"
                aria-label="add"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
                onClick={handleOpenAddForm}
            >
                <AddIcon />
            </Fab>
            <Dialog open={isAddFormOpen} onClose={handleCloseAddForm}>
                <DialogTitle style={{ textAlign: "center", paddingBottom: "0" }}>Add Product</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        error={newProduct.name.trim() === ""}
                        helperText={newProduct.name.trim() === "" ? "Name is mandatory" : ""}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        error={newProduct.description.trim() === ""}
                        helperText={newProduct.name.trim() === "" ? "Description is mandatory" : ""}
                    />
                    <TextField
                        label="Price"
                        fullWidth
                        margin="normal"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        error={newProduct.price.trim() === ""}
                        helperText={newProduct.price.trim() === "" ? "price is mandatory" : ""}
                    />
                    <TextField
                        label="Shipping Cost"
                        fullWidth
                        margin="normal"
                        value={newProduct.shipping_cost}
                        onChange={(e) => setNewProduct({ ...newProduct, shipping_cost: e.target.value })}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        error={newProduct.shipping_cost.trim() === ""}
                        helperText={newProduct.shipping_cost.trim() === "" ? "Shipping cost is mandatory" : ""}
                    />
                    <FormControl fullWidth margin="normal" error={newProduct.rating < 1}>
                        <TextField
                            label="Rating"
                            id="rating-input"
                            type="number"
                            value={newProduct.rating}
                            onChange={(e) => setNewProduct({ ...newProduct, rating: parseInt(e.target.value) })}
                            error={newProduct.rating < 1 || newProduct.rating > 5}
                            helperText={(newProduct.rating < 1 || newProduct.rating > 5) ? "Rating must be between 1 and 5" : ""}
                        />
                    </FormControl>


                    <FormControl fullWidth margin="normal">
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        >
                            {["Mens clothes", "Women's clothes", "Sunglasses", "Hats", "Bags"].map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Image URL"
                        fullWidth
                        margin="normal"
                        value={newProduct.image_url}
                        onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                        error={newProduct.image_url.trim() === ""}
                        helperText={newProduct.image_url.trim() === "" ? "Image url is mandatory" : ""}
                    />
                </DialogContent>
                <DialogActions style={{ justifyContent: "center", paddingTop: "0" }}>
                    <Button sx={{
                        alignSelf: 'center',
                        backgroundColor: 'beige',
                        color: 'black',
                        borderColor: 'black',
                        fontWeight: 'bold',
                    }} onClick={handleCloseAddForm} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                    <Button sx={{
                        alignSelf: 'center', backgroundColor: 'black', color: 'beige', borderColor: 'beige', fontWeight: 'bold'
                    }} onClick={handleAddProduct} variant="contained" color="primary"
                        disabled={
                            newProduct.name.trim() === "" ||
                            newProduct.description.trim() === "" ||
                            newProduct.price.trim() === "" ||
                            newProduct.shipping_cost.trim() === "" ||
                            newProduct.rating < 1 ||
                            newProduct.image_url.trim() === "" ||
                            newProduct.rating > 5
                        }>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default InventoryPage;
