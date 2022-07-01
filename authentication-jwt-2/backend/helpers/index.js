const nodemailer = require("nodemailer");

const sendEmail = (dataEmail) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'irfanrmdni209@gmail.com',
            pass: 'izjmssoxinuztoua',
        },
    });

    return (
        transporter.sendMail(dataEmail)
            .then(info => console.log(`Email terkirim: ${info.message}`))
            .catch(err => console.log(`Terjadi kesalahan: ${err}`))
    )
}

module.exports = sendEmail;