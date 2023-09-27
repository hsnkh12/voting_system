const axios = require("axios")


module.exports = class VotesUseCase {

    constructor(votesRepo, votesPublisher, resultsPublisher, voteToCandidateRepo){
        this.votesRepo = votesRepo
        this.votesPublisher =votesPublisher 
        this.resultsPublisher = resultsPublisher
        this.voteToCandidateRepo = voteToCandidateRepo
    }


    async publishVote(kwargs){

        const headers = {
            Authorization: kwargs.headers['authorization'],
            'Content-Type': 'application/json'
          };

        const body = {
            election_id : kwargs.election_id,
            candidates: kwargs.candidates
        }

        const vote = await this.votesRepo.findOne({
            where: {user_id: kwargs.user_id, election_id: kwargs.election_id},
            attributes: ["vote_id"]
        })

        if (vote){
            return this.throwError("User can only vote once on each election", 400)
        }

        const url = "http://"+process.env.ELECTION_MANAGEMENT_SERVICE_HOST+":"+process.env.ELECTION_MANAGEMENT_SERVICE_PORT+"/elections/init-vote-request"
        const response = await axios.post(url, body, {headers});

        const publishPayload = {
            election_to_candidates : response.data, 
            user_id: kwargs.user_id, 
            election_id:kwargs.election_id 
        }

        await this.votesPublisher.publishMessageToQueue(publishPayload, "submit-vote")
        // await this.resultsPublisher.publishMessageToQueue({election_id : kwargs.election_id})

        return response.data 
    }

    async findOneVote(vote_id){

        const vote = await this.votesRepo.findOne({where: {vote_id}})

        if(!vote){
            return this.throwError("Vote with this id is not found", 404)
        }

        return vote
    }

    async findAllVotes(election_id){

        const votes = await this.votesRepo.find({where: {election_id}})

        return votes
    }

    async findAllVoteToCandidates(election_id){

        const votes = await this.voteToCandidateRepo.find({where : {election_id}})
        return votes
    }


    throwError(message, status){

        const err = new Error()
        err.name = "VOTE_CASE_ERROR"
        err.message = message
        err.status = status
        throw err
    }
}