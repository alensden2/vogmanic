const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const helmet = require('helmet');
const app = express();
const  productsRoutes  = require('./routes/productsRoutes');
const adminRoutes = require('./routes/adminRoutes.js')

app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Ensures secue http calls
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', productsRoutes);
// app.use('/cart_db',productsRoutes);

// app.use('/', authenticationRouter);
// app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// admin routes
app.use('/admin', adminRoutes);

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.message);
});


// Start the socket server
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: '*'
    }
});

global.sockets = {};

io.on('connection', socket => {
    console.log('A client connected');

    var handshakeData = socket.request;
    const userId = handshakeData._query['userId'];
    global.sockets[userId] = socket;
    console.log("middleware:", handshakeData._query['userId']);

    socket.on('message', message => {
        console.log('Received message:', message);
        socket.emit('message', message);    // Echo the message back to the client
    });

    socket.on('disconnect', () => {
        global.sockets[userId] = null;
        console.log('A client disconnected');
    });
});

const serverPort = 6001;
server.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`);
});

module.exports = app;
