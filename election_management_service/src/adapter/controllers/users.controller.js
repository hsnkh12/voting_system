const {UserSignupBody, UserSigninBody, UserFilterQuery, UserResetPasswordBody, UserSMSVerifyBody} = require("../../core/validators/user.val")


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

            await this.smsUseCase.sendSMSCode(user.user_id)

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

            await this.smsUseCase.sendSMSCode(user.user_id)

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

    resetPassword = async (req, res) => {
        try{

            const user_id = req.user_id
            const {current_password, new_password} = req.body
            const validator = new UserResetPasswordBody(current_password, new_password)
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

        } catch(err){

        }
    }

    verifySMSCode = async (req, res) => {
        try{

            const {user_id, code} = req.body
            const validator = new UserSMSVerifyBody(user_id, code)
            validator.validate()

            const response = await this.smsUseCase.verifySMSCode({user_id, code})

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

}