const mongoose = require('mongoose');
const mailSender = require('../utils/nodemailer');
const { emailVerificationHtml } = require('../utils/template');

const otpSchema = new mongoose.Schema({
    otp: {
        type: String, //it can consist of characters
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        //this would be used for sorting the otp's
        type: Date,
        required: true,
        default: Date.now, //this might cause error?
        expires: 5*60
    }
});

otpSchema.pre('save', async function (next) {
    //if you use an arrow function 'this' won't refer to instance of otpSchema; instead it would refer to something else
    //send the verification email
    await mailSender(this.email, 'Email Verification', emailVerificationHtml(this.otp))
    .then(mailResponse => console.log('Email verification mail sent successfully:\n',mailResponse));
});

module.exports = mongoose.model('otpModel', otpSchema);