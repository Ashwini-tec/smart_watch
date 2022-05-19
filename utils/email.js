const nodemailer = require("nodemailer");
require("dotenv").config();

/**********************************//* contact via mail *//*****************************/

const contactMail = async(mailTo, body, subject)=> {
    return new Promise((resolve,reject)=>{

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT ,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // Message object
        let message = {
            from: `PDF Security<${process.env.EMAIL}>`,
            to: mailTo,
            subject: subject,
            html: body
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log("Error occurred. " + err.message);
                return reject({
                    sent: false,
                    message: err.message
                });
            }
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            return resolve({
                sent: true,
                message: `mail send suessfully ${info.messageId}`
            });
        });
    });
};


/************************* forgot password email ********** */
const forgotPasssword = async(mailTo, body)=> {
    return new Promise((resolve,reject)=>{

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT ,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // Message object
        let message = {
            from: `Smart Watch<${process.env.EMAIL}>`,
            to: mailTo,
            subject: "Reset Password Detail",
            html: `<h1>Message: ${body.message}</h1>
                    <h2>User UniqueId: ${body.uniqueId}</h2>`
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log("Error occurred. " + err.message);
                return reject({
                    sent: false,
                    message: err.message
                });
            }
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            return resolve({
                sent: true,
                message: `mail send suessfully ${info.messageId}`
            });
        });
    });
};


/************************* forgot password email ********** */
const welcomeMail = async(mailTo, body)=> {
    return new Promise((resolve,reject)=>{

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT ,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // Message object
        let message = {
            from: `Smart Watch<${process.env.EMAIL}>`,
            to: mailTo,
            subject: "Reset Password Detail",
            html: `<p>you are register to smart_watch tracking app. registered by organization
                    <b> ${body.organization}</b></p><br><br>
                    <h4>your email: ${body.email}</h4>
                    <h4>and password is: ${body.password}</h4>`
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log("Error occurred. " + err.message);
                return reject({
                    sent: false,
                    message: err.message
                });
            }
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            return resolve({
                sent: true,
                message: `mail send suessfully ${info.messageId}`
            });
        });
    });
};

module.exports = {
    contactMail,
    forgotPasssword,
    welcomeMail,
};
