

class CandidateCreateBody{


    constructor(candidate_name, first_name, last_name, email, image_url){
        this.candidate_name = candidate_name
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.image_url = image_url
    }

    validate(){
        var err = new Error()
        err.name = 'BODY_VALIDATION_ERROR'

        if(!this.candidate_name){
            err.message = "candidate_name field is missing"
            throw err
        }
        if(!this.first_name){
            err.message = "first_name field is missing"
            throw err
        }
        if(!this.last_name){
            err.message = "last_name field is missing"
            throw err
        }
        if(!this.email){
            err.message = "email field is missing"
            throw err
        }
        if(!this.image_url){
            err.message = "image_url field is missing"
            throw err
        }

        err = null 
        return true
    }
}

class CandidateFilterQuery{

    constructor(query){
        this.query = query
    }

    definePage(){
        return this.query.page ? Number(this.query.page) : 1
    }

    defineSort(){

        const sort = []

        if(this.query.sort_by){
            sort[0] = this.query.sort_by 
        } else {
            sort[0] = "createdAt"
        }

        if(this.query.sort_type){

            if (this.query.sort_type != "DESC" && this.query.sort_type != "ASC") sort[1] = "DESC";
            else sort[1] = this.query.sort_type;

        } else {
            sort[1] = "DESC"
        }

        return sort

    }
}

module.exports = {
    CandidateFilterQuery,
    CandidateCreateBody
}