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

dbConnect();

app.get('/', (req, res) => {
    res.send("Hello From Backend");
});

const chats = {};

io.on('connection', (socket) => {
    console.log('a user connected');
    const chatId = socket.request._query.chatId;
    const isLoggedIn = socket.request._query.isLoggedIn;

    socket.on('login', async (data) => {
        await login(data);
        socket.emit("otpSent");
    });

    socket.on('otpVerification', async (data) => {
        const result = await verifyOTP(data);

        if (!result) {
            socket.emit("otpFailed");
        } else {
            socket.emit("otpSuccess", { token: result });
        }
    });

    if (!chats[chatId]) {
        chats[chatId] = [];
    }

    chats[chatId].push(socket);

    socket.on("inviteUsers", async ({ chatId, token, invitedUser }) => {
        const decodedToken = validateToken(token);
        if (!decodedToken) {
            console.log("Invalid Token");
            return;
        }

        inviteUser({ chatId, invitedUser });
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
        if (!chats[currentChatId]) return;

        chats[chatId].forEach((s) => {
            if (s === socket) return;
            s.emit("message", message);
        });
    });

    socket.on("makePrivate", async ({ chatId, token }) => {
        const decodedToken = validateToken(token);
        if (!decodedToken) {
            console.log("Invalid Token");
            return;
        }

        await Chat.update({
            privacy: 1
        }, {

            where: {
                name: chatId,
                ownerId: decodedToken.userId
            }
        });
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});