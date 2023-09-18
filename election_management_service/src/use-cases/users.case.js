const {PasswordManager} = require("../adapter/utils/password")


module.exports = class UsersUseCase{

    constructor(UsersRepo){
        this.UsersRepo =UsersRepo 
    }   


    async createUser(kwargs){

        const hashedPassword = await PasswordManager.hashPassword(kwargs.password)
        kwargs.password = hashedPassword
        kwargs.date_joined = new Date()
        kwargs.is_admin = false
        kwargs.face_id_verified = false

        const user = await this.UsersRepo.create(kwargs)

        return {user_id:user.user_id} 

    }

    async validateUser(kwargs){

        const user = await this.UsersRepo.findOne({
            where:{email: kwargs.email},
            attributes: ["user_id", "email", "password"]
        })

        if(!user){
            return this.throwError("User not found", 404)
        }

        const isPasswordValid = await PasswordManager.comparePassword(kwargs.password, user.password)

        if(!isPasswordValid){
            return this.throwError("Invalid crednitials", 401)
        }

        return {user_id:user.user_id}

    }

    async findAllUsers(query){

        const page = Number.isInteger(query.definePage())? query.definePage() : 1
        const offset = (page - 1) * 50;

        const clause = {
            offset,
            limit: 50,
            where: query.defineClause(),
            order: [query.defineSort()],
            attributes: ["user_id", "username", "email", "phone_number" , "is_admin", "date_joined", "last_login", "face_id_verified"]
        }

        const users = await this.UsersRepo.find(clause)

        return users
    }

    async findOneUserById(user_id){

        const clause = {
            where: {user_id},
            attributes: ["user_id", "username", "email", "first_name","last_name","phone_number","date_joined","last_login"]
        }

        const user = await this.UsersRepo.findOne(clause)

        if (!user){
            return this.throwError("User with this id is not found", 404)
        }

        return user

    }

    async findOneUserByUsername(username){

        const clause = {
            where: {username},
            attributes: ["user_id", "username", "email", "first_name","last_name","phone_number","date_joined","last_login"]
        }

        const user = await this.UsersRepo.findOne(clause)

        if (!user){
            return this.throwError("User with this username is not found", 404)
        }

        return user

    }

    async updateUser(kwargs){

        const attrs = ["username", "email", "first_name","last_name","phone_number"] 

        const clause = {
            where: {user_id:kwargs.user_id},
            attributes: attrs 
        }

        const user = await this.UsersRepo.findOne(clause)

        if (!user){
            return this.throwError("User not found", 404)
        }


        for (const field in kwargs.updateFields) {
            if (!attrs.includes(field)){
                return this.throwError("'"+field+"' field cannot be updated", 400) 
            }
            if (kwargs.updateFields.hasOwnProperty(field) ) {
                user[field] = kwargs.updateFields[field];
            } 
        }

        user["user_id"] = kwargs.user_id

        await this.UsersRepo.save(user)

        return true

    }

    async destroyUser(user_id){

        await this.UsersRepo.destroy({
            where: {user_id}
        })

        return true

    }

    async updatePassword(kwargs){

        const user = await this.UsersRepo.findOne({
            where: {user_id: kwargs.user_id},
            attributes: ["user_id", "password"]
        })

        if (!user){
            return this.throwError("User not found", 404)
        }

        const isPasswordValid = await PasswordManager.comparePassword(kwargs.current_password, user.password)
        
        if(!isPasswordValid){
            return this.throwError("Password is invalid", 401)
        }

        user.password = await PasswordManager.hashPassword(kwargs.new_password)

        await this.UsersRepo.save(user)

        return true

    }

    throwError(message, status){

        const err = new Error()
        err.name = "USER_USE_CASE_ERROR"
        err.message = message
        err.status = status
        throw err
    }
}