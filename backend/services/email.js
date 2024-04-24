const { Resend } = require('resend');
require('dotenv').config();

function sendEmail(email, otp) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Please Verify Your Email',
        html: `<p>Please Use This OTP: ${otp}</p>`
    });
};

module.exports = {
    sendEmail,
};