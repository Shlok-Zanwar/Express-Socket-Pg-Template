// Import required packages
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { db } = require('./src/db/index.js');
const { authenticateToken, authenticateTokenSocket } = require('./src/middleware/auth.js');
const routes = require('./src/routes/index.js');

// const logger = require('./src/middleware/logger.js');
var logger = require('morgan');

// ############### PostgreSQL DB ###############
try {
    db.connect();
    console.log('Connected to PostgreSQL DB');
} catch (error) {
    console.log('Error connecting to PostgreSQL DB', error);
}

// ############### Express server ###############
// Create a new Express application
const app = express();

// Set up the server and Socket.IO
const server = createServer(app);

// Set up the middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//     logger.info(`${req.method} ${req.url}`);
//     next();
// });
app.use(logger('dev'));


// Set up the routes
app.use('/', routes);

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// ############### Socket.IO server ###############
// Create a new Socket.IO server
const io = new Server(server, { pingInterval: 30000, pingTimeout: 50000 });

// Set up the Socket.IO middleware
io.use(authenticateTokenSocket);


module.exports = { io };