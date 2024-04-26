require('dotenv').config();
const User = require("../models/user");
const { sendEmail } = require("./email");
const jwt = require("jsonwebtoken");

async function login(data) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    sendEmail(data.email, otp);
    let user = await User.findOne({
        where: {
            email: data.email
        }
    });

    if (user) {
        user.otp = otp;
        await user.save();
    } else {
        user = await User.create({ email: data.email, otp });
    }
}

async function verifyOTP(data) {
    const otp = data.otp;
    const email = data.email;
    const user = await User.findOne({ where: { email, otp } });
    if (!user) {
        return false;
    } else {
        const token = jwt.sign({ userId: user.dataValues.id }, process.env.JWT_SECRET);
        return token;
    }
}

function validateToken(token) {
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        return decode;
    } catch (e) {
        return false;
    }
}

module.exports = { login, verifyOTP, validateToken };