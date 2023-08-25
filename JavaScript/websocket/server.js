import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 5000;

io.on('connection', (socket) => {
    const clientId = socket.handshake.query.id;
    console.log(`client connected: ${clientId}`);

    socket.on('message', (message) => {
        console.log(`${clientId}: ${message}`);

        socket.emit('message', `${clientId}: ${message}`);
    });

    socket.on('disconnect', () => {
        console.log(`client disconnected: ${clientId}`);
    });
});

server.listen(port, () => {
    console.log(`start on port ${port}`);
});
