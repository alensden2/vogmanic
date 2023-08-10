const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

// Importing config variables
const { MONGO_DB_URL, PORT } = require('./config');

const app = express();

// Importing routes
const userRoutes = require('./routes/userRoutes');
const productsRoutes = require('./routes/productsRoutes');
const adminRoutes = require('./routes/adminRoutes.js');
const orderRoutes = require('./routes/orderRoutes');
const resaleProductsRoute = require('./routes/resaleProductsRoute');
const userDashboardRoutes = require('./routes/userDashboardRoutes');

// Middleware for handling CORS
app.use(cors());
// Middleware for parsing JSON
app.use(express.json());
// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

/** Health Check Endpoint */
app.get("/health-check", (request, response) => {
    response.status(200).send({
        status: true,
    });
});

// Defining routes
app.use('/admin', adminRoutes);
app.use('/users', userRoutes);
app.use('/dashboard', userDashboardRoutes);
app.use('/product', productsRoutes);
app.use('/order', orderRoutes);
app.use('/resale', resaleProductsRoute);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Send the error response
    res.status(err.status || 500);
    res.send(err.message);
});

// Create HTTP server and set up Socket.IO with CORS options
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: '*'
    }
});

// Global object to hold client sockets
global.sockets = {};

// Handling Socket.IO connections
io.on('connection', socket => {
    console.log('A client connected');

    var handshakeData = socket.request;
    const userId = handshakeData._query['userId'];
    global.sockets[userId] = socket; // Storing user socket
    console.log("middleware:", userId);

    // Receiving and echoing messages
    socket.on('message', message => {
        console.log('Received message:', message);
        socket.emit('message', message);
    });

    // Handling disconnection
    socket.on('disconnect', () => {
        global.sockets[userId] = null;
        console.log('A client disconnected');
    });
});

// Connecting to MongoDB and starting the server
mongoose.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    server.listen(PORT, () => {
        console.log(`Connected to MongoDB, Server listening on port ${PORT}`);
    });
}).catch((error) => {
    console.log(`error is ${error}`);
});

module.exports = app;
