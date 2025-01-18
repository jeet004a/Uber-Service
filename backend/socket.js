const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');
let io;

const initializeSocket = (server) => {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Clint Connected ${socket.id}`);

        socket.on('join', async(data) => {
            const { userId, userType } = data;
            // const { name } = data
            // console.log(data)
            if (userType == 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType == 'captain') {
                await captainModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                })
            }

        })

        socket.on('update-location-captain', async(data) => {
            const { userId, location } = data

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid Location' })
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            })
        })



        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};

const sendMessageToSocket = (event, message) => {
    if (io) {
        io.emit(event, message);
    } else {
        console.error('Socket.io is not initialized');
    }
};

module.exports = {
    initializeSocket,
    sendMessageToSocket
};