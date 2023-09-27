const VoteToCandidate= require("../../../core/models/votes_to_candidates.model")


module.exports = class VoteToCandidateRepo {

    async find(clause){
        return await VoteToCandidate.model.findAll(clause)
    }


}