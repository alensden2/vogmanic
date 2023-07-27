const ConfirmedOrders = require('../../models/ConfirmedOrders');

/**
 * Place Order
 * 
 * @param {request} request 
 * @param {response} response 
 */
const placeOrder = async (request, response) => {
    try {
        const { orderId, items, shippingAddress } = request.body;

        const newOrder = new ConfirmedOrders({
            orderId,
            items,
            shippingAddress
        });

        await newOrder.save();

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
 * @param {request} request 
 * @param {response} response 
 */
const getAllOrders = async (request, response) => {
    try {
        let orders = await ConfirmedOrders.find();  
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
 * @param {request} request 
 * @param {response} response 
 */
const getOrderById = async (request, response) => {
    try {
        const { orderId } = request.params;
        const orderDoc = await ConfirmedOrders.findById(orderId);
        const order = orderDoc.toObject();
        const { items } = order;

        let totalAmount = 0;
        let deliveryCharges = 0;

        items.forEach(item => {
            totalAmount += item.price;
            deliveryCharges += item.shipping_cost;
        });

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
 * @param {request} request 
 * @param {response} response 
 */
const cancelOrder = async (request, response) => {
    try {
        const { orderId } = request.params;
        const { cancellationReason, cancellationComments } = request.body;

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
