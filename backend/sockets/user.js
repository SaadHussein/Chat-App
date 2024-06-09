const { validateToken, inviteUser } = require("../services/user");

const InviteUser = async ({ chatId, token, invitedUser }) => {
    const decodedToken = validateToken(token);
    if (!decodedToken) {
        console.log("Invalid Token");
        return;
    }

    inviteUser({ chatId, invitedUser });
};

module.exports = {
    InviteUser
};