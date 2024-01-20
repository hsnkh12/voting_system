const jwt = require('jsonwebtoken');

require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

function verifyTokenMiddleware(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        return res.sendStatus(403);
    }

}


function verifyUserMiddleware(req, res, next) {

    jwt.verify(req.token, JWT_SECRET_KEY, async(err, data) => {
        if (err) {
            return res.sendStatus(403);
        } else {
            req.is_admin = data.user_to_enc.is_admin
            req.user_id = data.user_to_enc.user_id
            req.face_id_verified = data.user_to_enc.face_id_verified
            next();

             
        }
    })

}

function verifyFaceIDMiddleware(req, res, next ) {

   if(!req.face_id_verified) {
    return res.status(403).json({message: "User must verify face ID"})
   }
   next()
}


function verifyAdminMiddleware(req, res, next) {

    if(!req.is_admin){
        return res.status(403).json({message: "User must be admin"})
    }
    next()
}


module.exports = {
    verifyTokenMiddleware,
    verifyUserMiddleware,
    verifyAdminMiddleware,
    verifyFaceIDMiddleware
}