const { Resend } = require('resend');
require('dotenv').config();

function sendOTP(email, otp) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Please Verify Your Email',
        html: `<p>Please Use This OTP: ${otp}</p>`
    });
};

function sendInvite({ email, chatId }) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'You Have Been Invited.',
        html: `<p>You Have an Invitation For This Chat: <a href="${process.env.PUBLIC_URL}/?chatId=${chatId}">Chat Link</a></p>`
    });
}

module.exports = {
    sendOTP,
    sendInvite
};