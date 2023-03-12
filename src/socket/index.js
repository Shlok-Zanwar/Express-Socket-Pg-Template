const { io } = require('../../index.js');


const socketController = (socket) => {
    console.log('New socket connection', socket.id);

    socket.on('disconnect', () => {
        console.log('Socket disconnected', socket.id);
    });
};

io.on('connection', socketController);
