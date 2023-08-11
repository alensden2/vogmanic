/*
 * InventoryPage component
 * This component renders an inventory management page for products. It fetches
 * the list of products from the server and allows users to view, delete, and apply
 * promotions to products. Users can also add new products. The component uses Material-UI
 * components for styling and includes success/failure dialogs for actions like deletion
 * and addition of products. The component provides a responsive and user-friendly interface
 * for managing the inventory.
 */
import AddIcon from "@mui/icons-material/Add";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
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
import { HOSTED_BASE_URL } from '../../../src/constants';
import AdminNavbar from "../../components/adminbar";

const InventoryPage = () => {
    const navigate = useNavigate();
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteFailure, setDeleteFailure] = useState(false);
    const [deletedProductName, setDeletedProductName] = useState("");
    const [promoDialogOpen, setPromoDialogOpen] = useState(false);
    const [selectedProductForPromo, setSelectedProductForPromo] = useState(null);
    const [discountedPrice, setDiscountedPrice] = useState("");
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showFailureDialog, setShowFailureDialog] = useState(false);
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

    /*
    * Function: onInfoClick
    * Description: Navigates to the '/sales' route when the user clicks on the sales information button.
    */
    const onInfoClick = () => {
        navigate('/sales');
    };

    /*
    * Function: handleShowSuccessDialog
    * Description: Sets 'showSuccessDialog' state to true, triggering the display of a success dialog.
    * Side Effects: Updates 'showSuccessDialog' state to true.
    */
    const handleShowSuccessDialog = () => {
        setShowSuccessDialog(true);
    };

    /*
    * Function: handleShowFailureDialog
    * Description: Sets 'showFailureDialog' state to true, triggering the display of a failure dialog.
    * Side Effects: Updates 'showFailureDialog' state to true.
    */
    const handleShowFailureDialog = () => {
        setShowFailureDialog(true);
    };

    /*
    * Function: handleCloseDialogs
    * Description: Closes both success and failure dialogs by setting their state values to false.
    * Side Effects: Updates 'showSuccessDialog' and 'showFailureDialog' states to false.
    */
    const handleCloseDialogs = () => {
        setShowSuccessDialog(false);
        setShowFailureDialog(false);
    };

    /*
    * Function: handleNavbarToggle
    * Description: Toggles the state of the mobile navigation menu.
    */
    const handleNavbarToggle = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    /*
    * Function: handleSetDiscount
    * Description: Applies a discount to a selected product by updating its price in the database and local state.
    *              If a valid discount price and a selected product are available, the function fetches the product's
    *              current details, updates the price, and updates the local state to reflect the change.
    */
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
            .put(`${HOSTED_BASE_URL}/admin/updateProduct/${productId}`, updatedProduct, { headers })
            .then((response) => {
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === productId ? { ...product, price: discountedPrice } : product
                    )
                );
            })
            .catch((error) => {
                console.error("Error updating product:", error);
            });
        setPromoDialogOpen(false);
        setDiscountedPrice("");
    };

    /* 
    * useEffect: Fetches the list of products from the server and updates the local state.
    * Description: This effect runs once when the component mounts. It retrieves the list of products
    * from the server using an authenticated API request with the user's access token. The retrieved
    * product data is then used to update the local state, specifically the 'products' state variable,
    * which holds the list of products displayed on the inventory page.
    * Dependencies: 'localStorage', 'axios', 'setProducts', 'HOSTED_BASE_URL'
    */
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const headers = { Authorization: `Bearer ${accessToken}` };

        axios
            .get(`${HOSTED_BASE_URL}/admin/products`, { headers })
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    /*
    * Function: handleDeleteProduct
    * Description: Deletes a product from the server and updates the local state accordingly.
    * Parameters:
    *   - productId: The unique identifier of the product to be deleted.
    *   - productName: The name of the product to be deleted.
    * Side Effects: May update 'deleteSuccess', 'deleteFailure', 'deletedProductName', and 'products' state variables.
    * Dependencies: 'localStorage', 'axios', 'setDeleteSuccess', 'setDeleteFailure', 'setDeletedProductName', 'setProducts', 'HOSTED_BASE_URL'
    */
    const handleDeleteProduct = (productId, productName) => {
        const accessToken = localStorage.getItem("accessToken");
        const headers = { Authorization: `Bearer ${accessToken}` };
        axios
            .delete(`${HOSTED_BASE_URL}/admin/deleteProduct/${productId}`, { headers })
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

    /*
    * Function: handlePromoProduct
    * Description: Prepares the selected product for a promotion and opens the promotion dialog.
    * Parameters:
    *   - productId: The unique identifier of the product to be promoted.
    *   - productName: The name of the product to be promoted.
    * Side Effects: May update 'selectedProductForPromo' and 'promoDialogOpen' state variables.
    */
    const handlePromoProduct = (productId, productName) => {
        setSelectedProductForPromo({ productId, productName });
        setPromoDialogOpen(true);
    };

    /*
    * Function: handleDialogClose
    * Description: Closes the success and failure dialogs for product deletion or other actions.
    * Side Effects: Updates 'deleteSuccess' and 'deleteFailure' state variables.
    */
    const handleDialogClose = () => {
        setDeleteSuccess(false);
        setDeleteFailure(false);
    };
    /*
    * Function: handleOpenAddForm
    * Description: Opens the add product form by updating the 'isAddFormOpen' state.
    * Side Effects: Updates the 'isAddFormOpen' state to true.
    */
    const handleOpenAddForm = () => {
        setIsAddFormOpen(true);
    };
    /*
    * Function: handleCloseAddForm
    * Description: Closes the add product form and resets the input fields by updating state variables.
    * Side Effects: Updates the 'isAddFormOpen' state to false, resets the 'newProduct' state with default values.
    */
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
    /*
    * Function: handleAddProduct
    * Description: Adds a new product to the server and updates the product list in the state.
    * Side Effects: Makes a POST request to add the new product, updates 'products' state on success, shows success or failure dialogs.
    */
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
            .post(`${HOSTED_BASE_URL}/admin/addProduct`, newProduct, { headers })
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