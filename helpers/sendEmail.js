const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const  RequestError = require('./RequestError');

const {SENDGRED_API_KEY} = process.env;

sgMail.setApiKey(SENDGRED_API_KEY);

const sendEmail = async(data) => { 
    try {
        const email = { ...data, from: "dm.gashutin@gmail.com" };
        await sgMail.send(email);
        return true;
    } catch (error) {
        throw RequestError(500,"Failed to send email");
    }
}

module.exports = sendEmail; 