const express = require('express');
const { PORT } = require('./config');
const expressApp = require('./express-app');
const http = require('http');
const { initializeSocket } = require('./socket');

const StartServer = async() => {
    const app = express();

    await expressApp(app);

    const server = http.createServer(app);
    initializeSocket(server);

    server.listen(PORT, () => console.log(`server listen on ${PORT}`)).on('error', (err) => {
        console.log('Error from server', err);
        process.exit();
    });
};

StartServer();