const { PasswordManager } = require("../adapter/utils/password")
const jwt = require("jsonwebtoken")
const { Op } = require('sequelize');


module.exports = class SMSUseCase {

    constructor(smsRepo, usersRepo) {
        this.smsRepo = smsRepo
        this.usersRepo = usersRepo
    }


    async sendSMSCode({ user_id, phone_number }) {

        const currentDate = new Date();
        const exp_date = new Date(currentDate.getTime() + 300_000);
        const code = Math.floor(10000 + Math.random() * 90000);

        const nonExpiredsmsUserCodes = await this.smsRepo.find({
            where: {
                user_id: user_id, expire_date: {
                    [Op.gte]: currentDate
                }, phone_number
            },
            attributes: ["sms_user_code_id"]
        })

        // Only allow to resend code 3 times before expiration
        if (nonExpiredsmsUserCodes.length >= 3) {
            return
        }

        const twilio = require('twilio');

        // Replace these values with your Twilio credentials and phone number
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

        const client = new twilio(accountSid, authToken);

        // Replace 'to', 'from', and 'body' with the recipient's number, your Twilio number, and the message body
        // client.messages
        //     .create({
        //         to: '+905338305623',
        //         from: twilioPhoneNumber,
        //         body: 'Hello from cypevote! your code is: '+code.toString(),
        //     })
        //     .then((message) => console.log(code))
        //     .catch((error) => console.error(`Error sending SMS: ${error.message}`));


        console.log(code);
        const hashedCode = await PasswordManager.hashPassword(code.toString())

        await this.smsRepo.create({ user_id: user_id, code: hashedCode, expire_date: exp_date, phone_number })


    }

    async verifySMSCode(kwargs) {

        const currentDate = new Date()

        const smsUserCode = await this.smsRepo.findOne({
            where: {
                user_id: kwargs.user_id, expire_date: {
                    [Op.gte]: currentDate
                }, phone_number: kwargs.phone_number
            },
            attributes: ["sms_user_code_id", "code"]
        })


        if (!smsUserCode) {
            this.throwError("User code is not found", 404)
        }

        const isCodeVerified = await PasswordManager.comparePassword(kwargs.code.toString(), smsUserCode.code)

        if (!isCodeVerified) {
            return this.throwError("Code is not valid", 403)
        }

        await this.smsRepo.destroy({
            where: { sms_user_code_id: smsUserCode.sms_user_code_id, phone_number: kwargs.phone_number }
        })

        return true

    }


    throwError(message, status) {
        const err = new Error()
        err.name = "SMS_CASE_ERROR"
        err.message = message
        err.status = status
        throw err
    }
}