const Product = require('../../models/Product')
const ConfirmedOrders = require('../../models/ConfirmedOrders');
const Employee = require('../../models/Employee')

/**
 * Get All Products
 * 
 * This function retrieves all products from the product collection. It's typically used by
 * the admin to view the entire inventory of products.
 * 
 * @param {request} req - The request object.
 * @param {response} res - The response object for sending the products list.
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
 * Add a New Product
 * 
 * This function enables the admin to add a new product to the product collection,
 * including details like name, description, price, category, etc.
 * 
 * @param {request} req - The request object containing the product details.
 * @param {response} res - The response object for confirming the product addition.
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
 * Delete a Product by its ID
 * 
 * This function allows the admin to delete a specific product by its ID from the product collection.
 * 
 * @param {request} req - The request object containing the product ID.
 * @param {response} res - The response object for confirming the deletion.
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
 * Update a Product's Details
 * 
 * This function lets the admin update details of a specific product, such as the name or price.
 * 
 * @param {request} req - The request object containing the product ID and updated details.
 * @param {response} res - The response object for confirming the update.
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
 * Get All Confirmed Orders
 * 
 * This function retrieves all confirmed orders from the orders collection, allowing the admin to
 * view and manage them.
 * 
 * @param {request} req - The request object.
 * @param {response} res - The response object for sending the orders list.
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

/**
 * Calculate the Total Cost for a Single Order
 * 
 * This function calculates the total cost for a single order, including both the price of 
 * each item and its shipping cost. It takes an order object containing items as input 
 * and returns the total cost for that order.
 * 
 * @param {Object} order - An order object containing an array of items.
 * @return {number} The total cost for the given order.
 */
const calculateTotalCost = (order) => {
    const totalCost = order.items.reduce((acc, item) => {
        return acc + item.price + item.shipping_cost;
    }, 0);

    return totalCost;
};

/**
 * Calculate Total Cost for Each Order
 * 
 * This function calculates the total cost for each order in an array of orders. It leverages the
 * calculateTotalCost function for calculating the cost for individual orders and constructs a 
 * result array containing the order ID and total cost for each order.
 * 
 * @param {Array} orders - An array of order objects, each containing an orderId and an array of items.
 * @return {Array} An array containing objects with orderId and totalCost for each given order.
 */
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
 * Get Total Cost Per Order
 * 
 * This asynchronous function retrieves all the confirmed orders and calculates the total cost 
 * including both the item price and shipping cost. The result is sent as a JSON response.
 * 
 * @param {request} req - The request object.
 * @param {response} res - The HTTP response object.
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
 * Get Total Cost Per Order
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
 * Count Total Orders
 * 
 * This asynchronous function retrieves all confirmed orders and returns the total count 
 * as a JSON response.
 * 
 * @param {request} req - The HTTP request object.
 * @param {response} res - The HTTP response object.
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
 * Calculate Total Items Sold
 * 
 * This asynchronous function retrieves all the confirmed orders and calculates the total number 
 * of items sold by summing the quantity of each item in all orders. The result is sent as a 
 * JSON response.
 * 
 * @param {request} req - The HTTP request object.
 * @param {response} res - The HTTP response object.
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
 * Get All Employees
 * 
 * This function retrieves all employees from the employee collection, providing
 * the admin with a view of all staff members and their details.
 * 
 * @param {request} req - The request object.
 * @param {response} res - The response object for sending the employees list.
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
 * Add a New Employee
 * 
 * This function enables the admin to add a new employee to the system, including
 * personal and professional details.
 * 
 * @param {request} req - The request object containing the employee details.
 * @param {response} res - The response object for confirming the employee addition.
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
 * Delete an Employee
 * 
 * This function allows the admin to delete an employee from the system, typically used
 * for managing staff records.
 * 
 * @param {request} req - The request object containing the employee ID.
 * @param {response} res - The response object for confirming the deletion.
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

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllConfirmedorders,
    getTotalCostEachOrder,
    getTotalCostPerOrder,
    getAllEmployees,
    deleteEmployee,
    addEmployee,
    calculateTotalItemsSold,
    countTotalOrders
};
