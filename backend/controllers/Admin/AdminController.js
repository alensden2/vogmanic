const { MongoClient, ServerApiVersion } = require('mongodb');
const Product = require('../../models/Product')
const ConfirmedOrders = require('../../models/ConfirmedOrders');
const Employee = require('../../models/Employee')
// To be replaced with env vars for creds, all hard coded strings will be kept in JSON "resources.json"

/**
 * Gets all the product available
 * 
 * @param {request} req 
 * @param {response} res 
 */
const getAllProducts = async (req, res) => {
    try {
        // finds all the products
        const product = await Product.find();
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    };
}

/**
 * Add a new product
 * 
 * @param {request} req 
 * @param {response} res 
 */
const addProduct = async (req, res) => {
    try {
        // extract product data
        const {
            name,
            description,
            price,
            shipping_cost,
            rating,
            category,
            image_url
        } = req.body;

        // create a new product
        const newProduct = new Product({
            name,
            description,
            description,
            price,
            shipping_cost,
            rating,
            category,
            image_url
        });

        /**
         * In a real scenerio the image is dumped to a s3 bucket
         * the reference is stored here 
         * 
         * I can also use multer to upload a blob object, but that is not good practice 
         * to store a base x64 string in the no sql db
         */

        // save to data 
        await newProduct.save();

        res.status(200).json({
            message: "Product saved successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}

/**
 * Delete a product by its ID
 * 
 * @param {request} req 
 * @param {response} res 
 */
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        // Find the product by its ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Promotions 
 * 
 * @param {request} req 
 * @param {response} res 
 */
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price } = req.body;

        // Modify the name to add "DISCOUNTED" at the end
        const updatedName = name + " DISCOUNTED";

        // Find the product by its ID and update its name and price
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name: updatedName, price },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

/**
 * Gets all confirmed orders 
 * 
 * @param {request} req 
 * @param {response} res 
 */
const getAllConfirmedorders = async (req, res) => {
    try {
        // finds all the confirmed orders
        const orders = await ConfirmedOrders.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    };
}

// Calculate the total cost for a single order
const calculateTotalCost = (order) => {
    const totalCost = order.items.reduce((acc, item) => {
        return acc + item.price + item.shipping_cost;
    }, 0);

    return totalCost;
};

// Calculate total cost for each order
const calculateTotalCostPerOrder = (orders) => {
    const totalCostPerOrder = orders.map((order) => {
        return {
            orderId: order.orderId,
            totalCost: calculateTotalCost(order),
        };
    });

    return totalCostPerOrder;
};

/**
 * Total cost each order
 * 
 * @param {request} req 
 * @param {response} res 
 */
const getTotalCostEachOrder = async (req, res) => {
    try {
        // finds all the confirmed orders
        const orders = await ConfirmedOrders.find();
        const cost_of_each_order = calculateTotalCostPerOrder(orders);
        res.status(200).json(cost_of_each_order);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    };
}

/**
 * Total cost each order single
 * 
 * @param {request} req 
 * @param {response} res 
 */
const getTotalCostPerOrder = async (req, res) => {
    try {
        // finds all the confirmed orders
        const orders = await ConfirmedOrders.find();

        // Calculate the total cost for all orders
        const totalSales = orders.reduce((acc, order) => {
            const totalCost = order.items.reduce((acc, item) => {
                return acc + item.price + item.shipping_cost;
            }, 0);

            return acc + totalCost;
        }, 0);

        res.status(200).json({
            totalSales: totalSales.toFixed(2),
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    };
}

/**
 * Gets total orders 
 * 
 * @param {request} req 
 * @param {response} res 
 */
const countTotalOrders = async (req, res) => {
    try {
        // Find all the confirmed orders
        const orders = await ConfirmedOrders.find();
        // Return the total number of orders
        return res.status(200).json({ "TotalOrders": orders.length })
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(400).json({
            message: error.message
        });
    }
};

/**
 * Gets total items sold 
 * 
 * @param {request} req 
 * @param {response} res 
 */
const calculateTotalItemsSold = async (req, res) => {
    try {
        // Find all the confirmed orders
        const orders = await ConfirmedOrders.find();

        // Calculate the total items sold by summing the quantity of each item in all orders
        let totalItemsSold = 0;
        orders.forEach((order) => {
            totalItemsSold += order.items.length;
        });
        return res.status(200).json({ totalItemsSold: totalItemsSold })
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

/**
 * Gets all the employees
 * 
 * @param {request} req 
 * @param {response} res 
 */
const getAllEmployees = async (req, res) => {
    try {
        // finds all the employees
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    };
}

/**
 * Add a new employees
 * 
 * @param {request} req 
 * @param {response} res 
 */
const addEmployee = async (req, res) => {
    try {
        // extract employee data
        const {
            firstName,
            lastName,
            address,
            email,
            phone,
            employeeId
        } = req.body;

        // create a new employee
        const newEmployee = new Employee({
            firstName,
            lastName,
            address,
            email,
            phone,
            employeeId
        });

        // save to database
        await newEmployee.save();

        res.status(200).json({
            message: "Employee added successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}

/**
 * Delete a employee
 * 
 * @param {request} req 
 * @param {response} res 
 */
const deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        // Find the employee by its ID and delete it
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const testAdminProductsController = async (req, res) => {
    res.status(200).json({
        status: "Works Admin Controller"
    })
}

module.exports = { getAllProducts, testAdminProductsController, addProduct, updateProduct, deleteProduct, getAllConfirmedorders, getTotalCostEachOrder, getTotalCostPerOrder, getAllEmployees, deleteEmployee, addEmployee, calculateTotalItemsSold, countTotalOrders }
