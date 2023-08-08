const ConfirmedOrders = require('../../models/ConfirmedOrders');
const ResaleProducts = require('../../models/ResaleProducts');

/**
 * Place Order
 * 
 * @param {request} request 
 * @param {response} response 
 */
const placeOrder = async (request, response) => {
    try {
        const { orderId, userEmail, items, shippingAddress } = request.body;

        const newOrder = new ConfirmedOrders({
            orderId,
            items,
            userEmail,
            shippingAddress
        });

        await newOrder.save();
        items.forEach(async (item) => {
            const oldItem = await ResaleProducts.findOne({ _id: item._id, userEmail: userEmail });                          
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
 * @param {request} request 
 * @param {response} response 
 */
const getAllOrders = async (request, response) => {
    try {
        const { userEmail } = request.body;
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
