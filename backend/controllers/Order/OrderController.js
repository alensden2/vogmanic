const ConfirmedOrders = require('../../models/ConfirmedOrders');
const ResaleProducts = require('../../models/ResaleProducts');

/**
 * Place Order
 * 
 * This function is responsible for placing an order. It receives order details
 * from the client, saves them in the confirmed orders collection, and adds 
 * and delete resale products as necessary.
 * 
 * @param {request} request - The request object containing order details.
 * @param {response} response - The response object for sending the status.
 */
const placeOrder = async (request, response) => {
    try {
        const { orderId, userEmail, items, shippingAddress } = request.body;

        // Create and save a new confirmed order
        const newOrder = new ConfirmedOrders({
            orderId,
            items,
            userEmail,
            shippingAddress
        });
        await newOrder.save();

        // Iterate through items, add and delete resale products if applicable
        items.forEach(async (item) => {
            const oldItem = await ResaleProducts.findOne({ _id: item._id });

            // Delete the sold resale product record
            if (oldItem) {
                await ResaleProducts.deleteOne({ _id: oldItem._id });
            }
            const newResaleProduct = new ResaleProducts({
                name: item.name,
                description: item.description,
                price: item.price,
                shipping_cost: item.shipping_cost,
                rating: item.rating,
                category: item.category,
                userEmail: userEmail,
                image_url: item.image_url
            });

            // Save the resale product
            await newResaleProduct.save();
        });

        response.status(200).json({
            message: "Order placed successfully"
        });
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    };
};

/**
 * Get all orders
 * 
 * This function fetches all the orders for a specific user.
 * 
 * @param {request} request - The request object containing user email.
 * @param {response} response - The response object for sending the orders.
 */
const getAllOrders = async (request, response) => {
    try {
        const { userEmail } = request.body;

        // Get all orders for a specific user
        let orders = await ConfirmedOrders.find({ userEmail });  
        orders = orders.map(order => {
            const { _id, orderId, createdAt, updatedAt } = order.toObject();
            return { _id, orderId, createdAt, updatedAt };
        });

        response.status(200).send({ orders });
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    };
};

/**
 * Get order by Id
 * 
 * This function fetches a specific order by its Id, including the total amount,
 * delivery charges, and tax.
 * 
 * @param {request} request - The request object containing order ID.
 * @param {response} response - The response object for sending the order details.
 */
const getOrderById = async (request, response) => {
    try {
        const { orderId } = request.params;

        // Get the specific order from DB
        const orderDoc = await ConfirmedOrders.findById(orderId);
        const order = orderDoc.toObject();
        const { items } = order;

        let totalAmount = 0;
        let deliveryCharges = 0;

        items.forEach(item => {
            totalAmount += item.price;
            deliveryCharges += item.shipping_cost;
        });

        // Calculate the amounts
        order.totalAmount = totalAmount;
        order.deliveryCharges = deliveryCharges;
        order.tax = totalAmount * 0.15;

        response.status(200).send({ order });
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    };
};

/**
 * Cancel order
 * 
 * This function cancels an existing order and updates its status in the database.
 * 
 * @param {request} request - The request object containing order ID and cancellation details.
 * @param {response} response - The response object for sending the cancellation status.
 */
const cancelOrder = async (request, response) => {
    try {
        const { orderId } = request.params;
        const { cancellationReason, cancellationComments } = request.body;

        // Update the order status and details in case of cancel or return
        const updatedOrder = await ConfirmedOrders.findByIdAndUpdate(
            orderId,
            { 
                status: 'Cancelled',
                cancellationReason: cancellationReason || undefined,
                cancellationComments: cancellationComments || undefined
            },
            { new: true }
        );

        if (!updatedOrder) {
            return response.status(404).json({
                message: "Order not found"
            });
        }

        response.status(200).json({
            message: "Order cancelled successfully",
            order: updatedOrder
        });
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    };
};


module.exports = {
    placeOrder,
    getAllOrders,
    getOrderById,
    cancelOrder
};
