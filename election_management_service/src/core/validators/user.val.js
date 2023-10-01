


class UserSignupBody{


    constructor( username,
        email,
        first_name,
        last_name,
        phone_number,
        password){
            this.username = username 
            this.email = email 
            this.first_name = first_name
            this.last_name = last_name
            this.phone_number = phone_number
            this.password = password
        }
   

    validate(){
        var error = new Error();

        error.name = 'BODY_VALIDATION_ERROR'

        if (!this.username){
            error.message = "username field is missing"
            throw error
        }

        if (!this.email){
            error.message = "email field is missing"
            throw error
        }

        if (!this.first_name){
            error.message = "first_name field is missing"
            throw error
        }

        if (!this.last_name){
            error.message = "last_name field is missing"
            throw error
        }

        if (!this.phone_number){
            error.message = "phone_number field is missing"
            throw error
        }

        if (!this.password){
            error.message = "password field is missing"
            throw error
        }

        error = null
        return true


        
    }
}

class UserSigninBody{

    constructor( email, password){

        this.email = email 
        this.password = password
    }


    validate(){
        var error = new Error();

        error.name = 'BODY_VALIDATION_ERROR'
        if(!this.email){
            error.message = "email field is missing"
            throw error

        }

        if(!this.password){
            error.message = "password field is missing"
            throw error

        }

        error = null

        return true
    }


}

class UserSMSVerifyBody{

    constructor(user_id, code){
        this.user_id = user_id
        this.code = code
    }

    validate(){
        var error = new Error();

        error.name = 'BODY_VALIDATION_ERROR'

        if(!this.user_id){
            error.message = "user_id field is missing"
            throw error
        }
        if(!this.code){
            error.message = "code field is missing"
            throw error
        }

        error = null 
        return true

    }
}

class UserResetPasswordBody{

    constructor(new_password, confirmed_password){
        this.new_password = new_password
        this.confirmed_password = confirmed_password
    }

    validate(){
        var err = new Error()
        err.name = 'BODY_VALIDATION_ERROR'

        if(!this.new_password){
            err.message = "new_password field is missing"
            throw err
        }
        if(!this.confirmed_password){
            err.message = "confirmed_password field is missing"
            throw err 
        }
        if(this.new_password != this.confirmed_password){
            err.message = "Passwords do not match"
            throw err
        }

        err = null 
        return true 
    }
}

class UserUpdatePasswordBody{

    constructor(current_password, new_password){
        this.current_password = current_password
        this.new_password = new_password
    }

    validate(){

        var error = new Error();

        error.name = 'BODY_VALIDATION_ERROR'

        if(!this.current_password){
            error.message = "current password field is missing"
            throw error
        }

        if (!this.new_password){
            error.message = "new password field is missing"
            throw error
        }

        error = null

        return true
    }
}


class UserEmailBody{

    constructor(email){
        this.email = email
    }

    validate(){
        var err = new Error()
        err.name = "BODY_VALIDATION_ERROR"

        if(!this.email){
            err.message = "email field is missing"
            throw err
        }

        err = null 
        return true
    }
}


class UserFilterQuery{


    constructor(
        query
    ){
        this.query = query
    }



    defineClause(){

        let clause = {}

        if(this.query.is_admin){
            clause.is_admin = this.query.is_admin == 'true'? true : false
        }

        if(this.query.date_joined){
            clause.date_joined = new Date(this.query.date_joined)
        }

        if(this.query.face_id_verified){
            clause.face_id_verified =this.query.face_id_verified == 'true'? true : false
        }

        return clause
    }


    defineSort(){

        const sort = []

        if(this.query.sort_by){
            sort[0] = this.query.sort_by 
        } else {
            sort[0] = "date_joined"
        }

        if(this.query.sort_type){

            if (this.query.sort_type != "DESC" && this.query.sort_type != "ASC") sort[1] = "DESC";
            else sort[1] = this.query.sort_type;

        } else {
            sort[1] = "DESC"
        }

        return sort


    }


definePage(){
        return this.query.page ? Number(this.query.page) : 1
    }
}

module.exports = {
    UserSignupBody,
    UserSigninBody,
    UserFilterQuery,
    UserUpdatePasswordBody,
    UserSMSVerifyBody ,
    UserResetPasswordBody,
    UserEmailBody
}