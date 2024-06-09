require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const dbConnect = require("./db");
const { login, verifyOTP, validateToken, inviteUser } = require('./services/user');
const Chat = require("./models/chat");
const { Login, VerifyOTP } = require('./sockets/auth');
const { updateChatPrivacy } = require('./sockets/chat');
const { InviteUser } = require('./sockets/user');
const Message = require('./models/message');

dbConnect();

app.get('/', (req, res) => {
    res.send("Hello From Backend");
});

const chats = {};

io.on('connection', (socket) => {
    console.log('a user connected');
    const chatId = socket.request._query.chatId;
    const isLoggedIn = socket.request._query.isLoggedIn;

    socket.on('login', Login(socket));

    socket.on('otpVerification', VerifyOTP(socket));

    if (!chats[chatId]) {
        chats[chatId] = [];
    }

    chats[chatId].push(socket);

    socket.on("inviteUsers", InviteUser);

    socket.on("getMessages", async (data) => {
        const token = data.token;
        const decodedToken = validateToken(token);

        if (!decodedToken) {
            return;
        }

        const messages = await Message.findAll({
            where: {
                chatId: data.chatId
            }
        });

        socket.emit("getMessages", messages);
    });

    socket.on('message', async ({ message, token }) => {
        console.log(message);
        const currentChatId = message.chatId;

        const decodedToken = validateToken(token);
        if (!decodedToken) {
            console.log("Invalid Token");
            return;
        }

        await Chat.findOrCreate({
            where: {
                name: currentChatId
            },
            defaults: {
                ownerId: decodedToken.userId
            }
        });

        await Message.create({
            chatId: currentChatId,
            text: message.text,
            sender: decodedToken.userId
        });

        if (!chats[currentChatId]) return;

        chats[chatId].forEach((s) => {
            if (s === socket) return;
            s.emit("message", message);
        });
    });

    socket.on("makePrivate", updateChatPrivacy);
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});