const {UserSignupBody, UserSigninBody, UserFilterQuery, UserEmailBody, UserUpdatePasswordBody, UserSMSVerifyBody,UserResetPasswordBody} = require("../../core/validators/user.val")


module.exports = class UsersController{

    constructor(usersUseCase, smsUseCase){
        this.usersUseCase =usersUseCase 
        this.smsUseCase = smsUseCase
    }

    signup = async (req, res) => {
        try{

            const {username,
                email,
                first_name,
                last_name,
                phone_number,
                password} = req.body
    
            const userSignupBody = new UserSignupBody(username,email,first_name,last_name,phone_number,password)
            userSignupBody.validate()

            const user = await this.usersUseCase.createUser({username, email, first_name, last_name, phone_number, password})

            await this.smsUseCase.sendSMSCode({user_id: user.user_id, phone_number: user.phone_number})

            return res.status(201).json(user)

        } catch(err){

            if (err.name == "BODY_VALIDATION_ERROR"){
                return res.status(400).json({ 
                    message : err.message
                })
            }

            if (err.name == "SMS_CASE_ERROR"){
                return res.status(err.status).json({ 
                    message : err.message
                })
            }
    
            if (err.name == "SequelizeUniqueConstraintError"){
                return res.status(409).json({
                    message:'User with this email/username/phone_number already exists'
                });
            }
    
            if (err.name == "SequelizeValidationError"){
                return res.status(400).json({
                    message:'invalid credentials'
                });
            }
            
            console.log(err)
            return res.status(500).send({ message: "Internal server error" });
        }
    }

    signin = async (req, res) => {
        try{

            const {email, password} = req.body
            const userSignInBody = new UserSigninBody(email, password)
            userSignInBody.validate()

            const user = await this.usersUseCase.validateUser({email, password})

            await this.smsUseCase.sendSMSCode({user_id: user.user_id, phone_number: user.phone_number})

            return res.status(200).json(user)

        } catch(err){

            if (err.name == "BODY_VALIDATION_ERROR"){
                return res.status(400).json({ 
                    message : err.message
                })
            }

            if (err.name == "USER_USE_CASE_ERROR"){
                return res.status(err.status).json({
                    message: err.message 
                })
            }

            if (err.name == "SMS_CASE_ERROR"){
                return res.status(err.status).json({ 
                    message : err.message
                })
            }
    
            console.log(err)
            return res.status(500).json({ 
                message: "Internal server error" 
            });
        }
    }

    getAllUsers = async (req, res) => {

        try{

            const userQuery = new UserFilterQuery(req.query)
            const users = await this.usersUseCase.findAllUsers(userQuery)

            return res.status(200).json(users)

        } catch(err){
            if (err.name == "USER_USE_CASE_ERROR"){
                return res.status(err.status).json({
                    message: err.message 
                })
            }
            console.log(err)
            return res.status(500).json({ 
                message: "Internal server error" 
            });
        }
    }

    getOneUserById = async (req, res) => {
        try{

            const user_id = req.params.user_id

            if(user_id != req.user_id && !req.is_admin){
                return res.status(401).json({
                    message: "User is not authorized"
                })
            }

            const user = await this.usersUseCase.findOneUserById(user_id)

            return res.json(user)

        } catch(err){

            if (err.name == "USER_USE_CASE_ERROR"){
                return res.status(err.status).json({
                    message: err.message 
                })
            }

            console.log(err)

            return res.status(500).json({ 
                message: "Internal server error" 
            });

        }
    }

    getProfile = async (req, res) => {

        try{
           
            const r = await this.usersUseCase.findOneUserById(req.user_id)
            return res.json(r)

        } catch(err){
            return res.status(403)

        }
    }

    getOneUserByUsername = async (req, res)=>{
        try{
            const username = req.params.username
            const user = await this.usersUseCase.findOneUserByUsername(username)
            return res.json(user)

        } catch(err){

            if (err.name == "USER_USE_CASE_ERROR"){
                return res.status(err.status).json({
                    message: err.message 
                })
            }
            
            console.log(err)

            return res.status(500).json({ 
                message: "Internal server error" 
            });
        }

    }

    updateUser = async (req, res) => {
        try{

            const user_id = req.params.user_id; 
            const updateFields = req.body;  
            
            if(user_id != req.user_id && !req.is_admin){
                return res.status(401).json({
                    message: "User is not authorized"
                })
            }

            await this.usersUseCase.updateUser({user_id, updateFields})

            return res.send(true)

        } catch(err){

            if (err.name == "USER_USE_CASE_ERROR"){
                return res.status(err.status).json({
                    message: err.message 
                })
            }

            if (err.name == "SequelizeUniqueConstraintError"){
                return res.status(409).json({
                    message:'User with this email/username/phone_number already exists'
                });
            }
    
            if (err.name == "SequelizeValidationError"){
                return res.status(400).json({
                    message:'invalid credentials'
                });
            }

            console.log(err)
    
            return res.status(500).json({ 
                message: "Internal server error" 
            });

        }
    }

    deleteUser = async (req, res) => {
        try{

            const user_id = req.params.user_id; 

            if(user_id != req.user_id && !req.is_admin){
                return res.status(401).json({
                    message: "User is not authorized"
                })
            }

            await this.usersUseCase.destroyUser(user_id)

            return res.send(true)

        } catch(err){

            if(err.name === 'SequelizeInstanceError'){
                return res.status(404).json({
                    message: err.message 
                })
            }
    
            console.log(err)
            return res.status(500).json({ 
                message: "Internal server error" 
            });
        

        }
    }

    updatePassword = async (req, res) => {
        try{

            const user_id = req.user_id
            const {current_password, new_password} = req.body
            const validator = new UserUpdatePasswordBody(current_password, new_password)
            validator.validate()

            await this.usersUseCase.updatePassword({user_id, current_password, new_password})

            return res.status(201).send(true)
        } catch(err){

            if (err.name == "BODY_VALIDATION_ERROR"){
                return res.status(400).json({ 
                    message : err.message
                })
            }
    
            if (err.name == "USER_USE_CASE_ERROR"){
                return res.status(err.status).json({
                    message: err.message 
                })
            }
    
            if (err.name == "SequelizeValidationError"){
                return res.status(400).json({
                    message:'invalid credentials'
                });
            }
            
            console.log(err)
            return res.status(500).send({ message: "Internal server error" });

        }
    }

    verifyFaceIdOnSignup = async (req, res) => {
        try{

            const {token} = req.body 

            const r = await this.usersUseCase.verifyFaceId(token)

            return res.send(r)
        } catch(err){

            if (err.name == "USER_USE_CASE_ERROR"){
                return res.status(err.status).json({
                    message: err.message 
                })
            }
            
            console.log(err)
            return res.status(500).send({ message: "Internal server error" });
        }
    }

    verifySMSCodeOnSingIn = async (req, res) => {
        try{

            const {user_id, code, phone_number} = req.body
            const validator = new UserSMSVerifyBody(user_id, code, phone_number)
            validator.validate()

            await this.smsUseCase.verifySMSCode({user_id, code, phone_number})

            const response = await this.usersUseCase.signJWTOnSignin(user_id)

            await this.usersUseCase.updateUserLoginStatus(user_id)

            return res.json(response)

        } catch(err){

            if (err.name == "BODY_VALIDATION_ERROR"){
                return res.status(400).json({ 
                    message : err.message
                })
            }

            if (err.name == "SMS_CASE_ERROR"){
                return res.status(err.status).json({ 
                    message : err.message
                })
            }
    
            if (err.name == "USER_USE_CASE_ERROR"){
                return res.status(err.status).json({
                    message: err.message 
                })
            }
            
            console.log(err)
            return res.status(500).send({ message: "Internal server error" });

        }
    }


    resetPasswordRequest = async (req, res) => {

        try{

            const {email} = req.body
            const validator = new UserEmailBody(email)
            validator.validate()

            const response = await this.usersUseCase.sendPasswordToken(validator.email)

            return res.json(response)

        } catch (err){

            if (err.name == "BODY_VALIDATION_ERROR"){
                return res.status(400).json({ 
                    message : err.message
                })
            }

            if (err.name == "USER_USE_CASE_ERROR"){
                return res.status(err.status).json({
                    message: err.message 
                })
            }

            if (err.name == "EMAIL_CASE_ERROR"){
                return res.status(err.status).json({
                    message: err.message 
                })
            }
            
            console.log(err)
            return res.status(500).send({ message: "Internal server error" });

        }
    }


    changePhoneNumberRequest = async (req, res) => {

        try{

            const {new_phone_number} = req.body
            const user_id = req.user_id 

            if(!new_phone_number){
                return this.usersUseCase.throwError("new_phone_number field is missing",400)
            }

            await this.smsUseCase.sendSMSCode({user_id, phone_number:new_phone_number})

            return res.send(true)

        } catch(err){

            if (err.name == "USER_USE_CASE_ERROR"){
                return res.status(err.status).json({
                    message: err.message 
                })
            }

            if (err.name == "SMS_CASE_ERROR"){
                return res.status(err.status).json({ 
                    message : err.message
                })
            }
            
            console.log(err)
            return res.status(500).send({ message: "Internal server error" });

        }
    }

    changePhoneNumber = async (req, res) =>{

        try{

            const {code, new_phone_number} = req.body 
            const user_id = req.user_id

            await this.smsUseCase.verifySMSCode({user_id, code, phone_number: new_phone_number})
            await this.usersUseCase.renewPhoneNumber({user_id, new_phone_number})

            return res.send(true)

        } catch(err){

            if (err.name == "USER_USE_CASE_ERROR"){
                return res.status(err.status).json({
                    message: err.message 
                })
            }

            if (err.name == "SMS_CASE_ERROR"){
                return res.status(err.status).json({ 
                    message : err.message
                })
            }
            
            console.log(err)
            return res.status(500).send({ message: "Internal server error" });

        }
    }


    resetPassword = async (req, res) => {

        try{

            const token = req.query.token 

            const user_id = await this.usersUseCase.validatePasswordToken(token)

            const {new_password, confirmed_password} = req.body
            const validator = new UserResetPasswordBody(new_password, confirmed_password)
            validator.validate()

            await this.usersUseCase.resetPassword({user_id, new_password})

            return res.status(201).send(true)

        } catch(err){

            if (err.name == "BODY_VALIDATION_ERROR"){
                return res.status(400).json({ 
                    message : err.message
                })
            }

            if (err.name == "USER_USE_CASE_ERROR"){
                return res.status(err.status).json({
                    message: err.message 
                })
            }

            console.log(err)
            return res.status(500).send({ message: "Internal server error" });

        }
    }


    deleteAccountRequest = async (req, res) => {

        try{

            const user_id = req.user_id
            
            const response = await this.usersUseCase.sendDeleteAccountToken(user_id)

            return res.json(response)

        } catch(err){

            if (err.name == "BODY_VALIDATION_ERROR"){
                return res.status(400).json({ 
                    message : err.message
                })
            }

            if (err.name == "USER_USE_CASE_ERROR"){
                return res.status(err.status).json({
                    message: err.message 
                })
            }

            if (err.name == "EMAIL_CASE_ERROR"){
                return res.status(err.status).json({
                    message: err.message 
                })
            }
            
            console.log(err)
            return res.status(500).send({ message: "Internal server error" });

        }
    }

    contactUs = async (req, res) => {

        try{
            await this.usersUseCase.sendContactUsEmail(req.body)
            return res.json(true)
        } catch(err){
            console.log(err)
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }


    deleteAccount = async (req, res) => {


        try{

            const token = req.query.token 

            const user_id = await this.usersUseCase.validateDeleteAccountToken(token)

            const response = await this.usersUseCase.deleteUserAccount(user_id)

            return res.json(response)

        } catch(err){

            if (err.name == "USER_USE_CASE_ERROR"){
                return res.status(err.status).json({
                    message: err.message 
                })
            }

            console.log(err)
            return res.status(500).send({ message: "Internal server error" });

        }
    }

}