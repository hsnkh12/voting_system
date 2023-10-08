const crypto = require('crypto');
const iv = crypto.randomBytes(16); 

export class AES{

    constructor(){
        this.KEY = process.env.AES_KEY; 
        this.algorithm = "aes-256-cbc"
    }


    encrypt(txt) {
        const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.KEY), iv);
        let encrypted = cipher.update(txt, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    decrypt(txt) {
        const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.KEY), iv);
        let decrypted = decipher.update(txt, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }

}