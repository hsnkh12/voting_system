const crypto = require("crypto");
const dotenv = require("dotenv")
dotenv.config()

class AES{
// encrypt the message
 encrypt(plainText, outputEncoding, iv) {
    const cipher = crypto.
        createCipheriv("aes-256-cbc", process.env.AES_KEY, iv);
    return Buffer.
        concat([cipher.update(plainText), cipher.final()]).
        toString(outputEncoding);
}

//AES decryption
 decrypt(cipherText, outputEncoding, iv) {
    const cipher = crypto.
        createDecipheriv("aes-256-cbc", process.env.AES_KEY, iv);
    return Buffer.
        concat([cipher.update(cipherText), cipher.final()]).
        toString(outputEncoding);
}
}


module.exports = {
    AES
}