const VoteToCandidate = require("../storage/models/votes_to_candidates.model")

class VotesFilterQuery{

    constructor(query){
        this.query = query
    }


    defineInclude(){

        const include = {}

        if (this.query.sub_votes != undefined){
            include.model = VoteToCandidate
            include.attributes = ["candidate_name","election_to_candidate_id"]

            return [include]
        }

        return null
    }
    includeSubVotes(){

        if (this.query.sub_votes != undefined){
            return true
        }
        return false
    }


    definePage(){
        return this.query.page ? Number(this.query.page) : 1
    }

    defineSort(){

        const sort = []

        if(this.query.sort_by){
            sort[0] = this.query.sort_by 
        } else {
            sort[0] = "date_added"
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

module.exports = VotesFilterQuery