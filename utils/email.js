const nodemailer = require("nodemailer");
require("dotenv").config();
const ejs = require("ejs");

/**********************************//* contact via mail *//*****************************/

const contactMail = async(subject, body)=> {
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
        ejs.renderFile(global.__basedir + "/public/contactUsEmail.ejs", { body: body }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let message = {
                    from: `CuroCura.com<${process.env.EMAIL}>`,
                    cc: body.query,
                    to: process.env.EMAIL,
                    subject: subject,
                    html: data
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
            }}
        );
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
        ejs.renderFile(global.__basedir + "/public/forgotPasswordEmail.ejs", { link: body.link }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let message = {
                    from: `CuroCura.com<${process.env.EMAIL}>`,
                    to: mailTo,
                    subject: "Reset Password Detail",
                    html: data
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
            }}
        );
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
        ejs.renderFile(global.__basedir + "/public/registerUserEmail.ejs", { body: body }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let message = {
                    from: `CuroCura.com<${process.env.EMAIL}>`,
                    to: mailTo,
                    subject: "Registration Confirmation Mail",
                    html: data
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
            }
        });
    });
};

module.exports = {
    contactMail,
    forgotPasssword,
    welcomeMail,
};
