const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.send("Hello From Backend");
});

const sockets = [];

io.on('connection', (socket) => {
    console.log('a user connected');

    sockets.push(socket);

    socket.on('message', (message) => {
        console.log(message);

        sockets.forEach((s) => {
            if (s === socket) return;
            s.emit("message", message);
        });
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});