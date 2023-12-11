const axios = require("axios")
const AES = require("../core/encrypt/aes.encrypt")

module.exports = class VotesUseCase {

    constructor(votesRepo, votesPublisher, resultsPublisher, voteToCandidateRepo){
        this.votesRepo = votesRepo
        this.votesPublisher =votesPublisher 
        this.resultsPublisher = resultsPublisher
        this.voteToCandidateRepo = voteToCandidateRepo
    }


    async publishVote(kwargs){

        const aes = new AES()
        const user_id = kwargs.user_id.toString()
        const encryptedUserId = aes.encrypt(user_id)

        const headers = {
            Authorization: kwargs.headers['authorization'],
            'Content-Type': 'application/json'
          };

        const body = {
            election_id : kwargs.election_id,
            candidates: kwargs.candidates
        }

        if (await this.userVotedForElection({encryptedUserId, election_id: kwargs.election_id})){
            return this.throwError("User already voted for this election", 400)
        }


        const url = "http://"+process.env.ELECTION_MANAGEMENT_SERVICE_HOST+":"+process.env.ELECTION_MANAGEMENT_SERVICE_PORT+"/elections/init-vote-request"
        const response = await axios.post(url, body, {headers});

        const publishPayload = {
            election_to_candidates : response.data, 
            user_id: encryptedUserId, 
            election_id:kwargs.election_id 
        }

        await this.votesPublisher.publishMessageToQueue(publishPayload, "submit-vote")
        // await this.resultsPublisher.publishMessageToQueue({election_id : kwargs.election_id})

        return response.data 
    }


    async userVotedForElection({encryptedUserId, election_id}){

        const vote = await this.votesRepo.findOne({
            where: {user_id: encryptedUserId, election_id: election_id},
            attributes: ["vote_id"]
        })

        if (vote){
            return true
        }

        return false
    }

    async findOneVote(vote_id){

        const vote = await this.votesRepo.findOne({where: {vote_id}})
        console.log(require('crypto').randomBytes(16).toString('hex'))
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