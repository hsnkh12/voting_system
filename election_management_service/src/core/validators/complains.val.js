


class ComplainCreateBody {

    constructor(election_id, user_id, message){
        this.election_id = election_id
        this.user_id = user_id
        this.message = message
    }

    validate(){

        var err = new Error()
        err.name = "BODY_VALIDATION_ERROR"

        if (!this.election_id){
            err.message = "election_id field is missing"
            throw err
        }
        if(!this.user_id){
            err.message = "user_id field is missing"
            throw err
        }
        if(!this.message){
            err.message = "message field is missing"
            throw err
        }

        err = null 
        return true
    }
}


class ComplainFilterQuery {

    constructor(query){
        this.query = query
    }

    defineClause(){

        let clause = {}


        if(this.query.date_added){
            clause.date_added = new Date(this.query.date_added)
        }
        if(this.query.election_id){
            clause.election_id = this.query.election_id
        }
        if(this.query.user_id){
            clause.user_id = this.query.user_id
        }

        return clause

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

    definePage(){
        return this.query.page ? Number(this.query.page) : 1
    }
}

module.exports = {
    ComplainCreateBody,
    ComplainFilterQuery
}