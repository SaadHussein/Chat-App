const Chat = require("../models/chat");
const { validateToken } = require("../services/user");

const updateChatPrivacy = async ({ chatId, token }) => {
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
};

module.exports = {
    updateChatPrivacy
};