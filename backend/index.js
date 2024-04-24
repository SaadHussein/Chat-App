const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.send("Hello From Backend");
});

const chats = {};

io.on('connection', (socket) => {
    console.log('a user connected');
    const chatId = socket.request._query.chatId;

    if (!chats[chatId]) {
        chats[chatId] = [];
    }

    chats[chatId].push(socket);

    socket.on('message', (message) => {
        console.log(message);
        const currentChatId = message.chatId;

        if (!chats[currentChatId]) return;

        chats[chatId].forEach((s) => {
            if (s === socket) return;
            s.emit("message", message);
        });
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});