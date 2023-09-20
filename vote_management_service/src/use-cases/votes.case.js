const axios = require("axios")


module.exports = class VotesUseCase {

    constructor(votesRepo, votesPublisher, resultsPublisher){
        this.votesRepo = votesRepo
        this.votesPublisher =votesPublisher 
        this.resultsPublisher = resultsPublisher
    }


    async publishVote(kwargs){

        const headers = {
            Authorization: kwargs.headers['authorization'],
            'Content-Type': 'application/json'
          };

        const url = "http://"+process.env.ELECTION_MANAGEMENT_SERVICE_HOST+":"+process.env.ELECTION_MANAGEMENT_SERVICE_PORT+"/elections/init-vote-request"
        const response = await axios.post(url, { election_id, candidates}, {headers});

        await this.votesPublisher.publishMessageToQueue(response.data, "submit-vote")
        await this.resultsPublisher.publishMessageToQueue({election_id : kwargs.election_id})

        return true
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


    throwError(message, status){

        const err = new Error()
        err.name = "VOTE_CASE_ERROR"
        err.message = message
        err.status = status
        throw err
    }
}