
class ElectionCreateBody{

    constructor(title, election_type, description, no_of_votes_allowed_per_user){
        this.title = title
        this.election_type = election_type
        this.description = description
        this.no_of_votes_allowed_per_user = no_of_votes_allowed_per_user
    }

    validate(){
        var err = new Error()
        err.name = "BODY_VALIDATION_ERROR"

        if(!this.title){
            err.message = "title field is missing"
            throw err
        }
        if(!this.election_type){
            err.message = "election_type field is missing"
            throw err
        }
        if(!this.description){
            err.message = "description field is missing"
            throw err
        }
        if(!this.no_of_votes_allowed_per_user){
            err.message = "no_of_votes_allowed_per_user field is missing"
            throw err
        }

        err = null 
        return true
    }
}

class ElectionFilterQuery{

    constructor(
        query 
    ){
        this.query = query
    }


    defineClause(){
        // status, start_date, end_date, expected_end_date, 
        let clause = {}

        if(this.query.title){
            clause.title = this.query.title
        }
        if(this.query.status){
            clause.status = this.query.status
        }

        if(this.query.start_date){
            clause.start_date = new Date(this.query.start_date)
        }

        if(this.query.end_date){
            clause.end_date = new Date(this.query.end_date)
        }

        if(this.query.expected_end_date){
            clause.expected_end_date = new Date(this.query.expected_end_date)
        }
        if(this.query.election_title){
            clause.election_title = this.query.election_title
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
    ElectionFilterQuery,
    ElectionCreateBody
}