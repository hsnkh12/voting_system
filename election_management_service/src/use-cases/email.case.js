const nodemailer = require('nodemailer');


module.exports = class EmailUseCase {

    constructor(){
        this.transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD,
            },
          });
    }



    async sendEmail({to, message, title}){
        const mailOptions = {
            to: to,
            from: process.env.EMAIL_USER,
            subject: title,
            text: message
          };

        this.transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err)
                return this.throwError("Internal server error", 500)
            }
        })

        return true
    }


    throwError(message, status){
        const err = new Error()
        err.name = "EMAIL_CASE_ERROR"
        err.message = message
        err.status = status
        throw err
    }
}