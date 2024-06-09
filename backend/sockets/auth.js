const { login, verifyOTP } = require("../services/user");

const Login = (socket) => async (data) => {
    await login(data);
    socket.emit("otpSent");
};

const VerifyOTP = (socket) => async (data) => {
    const result = await verifyOTP(data);

    if (!result) {
        socket.emit("otpFailed");
    } else {
        socket.emit("otpSuccess", { token: result });
    }
};

module.exports = {
    Login,
    VerifyOTP
};

