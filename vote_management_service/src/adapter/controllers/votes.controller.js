const AES = require("../../core/encrypt/aes.encrypt")


module.exports = class VotesController {

    constructor(votesUseCase) {
        this.votesUseCase = votesUseCase
    }


    submitVote = async (req, res) => {

        try {

            const { election_id, candidates, face_reco_token} = req.body

            if(!face_reco_token){
                return res.status(400).json({message: "Face recogintion token required"})
            }
            if (!election_id || !candidates) {
                return res.status(400).json({
                    message: "election_id and candidates required in body"
                })
            }

            const resp = await this.votesUseCase.publishVote({ election_id, candidates, headers: req.headers, user_id: req.user_id , face_reco_token})

            return res.send(resp)

        } catch (err) {


            if (err.name == "AxiosError") {
                console.log(err)
                return res.status(400).json({
                    message: err.response.data.message
                })
            }

            if (err.name == "VOTE_CASE_ERROR") {
                return res.status(500).json({
                    message: err.message
                })
            }

            console.log(err)

            return res.status(500).json({
                message: "Internal server error"
            })

        }
    }


    userVotedForElection = async (req, res) => {

        try {
            const election_id = req.params.election_id
            const aes = new AES()
            const encryptedUserId = aes.encrypt(req.user_id.toString())
            console.log(encryptedUserId)
            const resp = await this.votesUseCase.userVotedForElection({encryptedUserId, election_id})
            return res.send(resp)

        } catch (err) {
            if (err.name == "VOTE_CASE_ERROR") {
                return res.status(err.status).json({
                    message: err.message
                })
            }

            console.log(err)

            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    getOneVote = async (req, res) => {

        try {

            const vote_id = req.params.vote_id

            const vote = await this.votesUseCase.findOneVote(vote_id)

            return res.json(vote)

        } catch (err) {

            if (err.name == "VOTE_CASE_ERROR") {
                return res.status(err.status).json({
                    message: err.message
                })
            }

            console.log(err)

            return res.status(500).json({
                message: "Internal server error"
            })

        }
    }

    getAllVoteToCandidate = async (req, res) => {

        try {

        } catch (err) {

            if (err.name == "VOTE_CASE_ERROR") {
                return res.status(err.status).json({
                    message: err.message
                })
            }

            console.log(err)

            return res.status(500).json({
                message: "Internal server error"
            })

        }
    }

    getAllVotes = async (req, res) => {

        try {

            const election_id = req.params.election_id

            const votes = await this.votesUseCase.findAllVotes(election_id)

            return res.json(votes)

        } catch (err) {

            if (err.name == "VOTE_CASE_ERROR") {
                return res.status(err.status).json({
                    message: err.message
                })
            }

            console.log(err)

            return res.status(500).json({
                message: "Internal server error"
            })

        }
    }


    getAllVoteToCandidates = async (req, res) => {

        try {

            const election_id = req.params.election_id

            const votes = await this.votesUseCase.findAllVoteToCandidates(election_id)

            return res.json(votes)

        } catch (err) {

            if (err.name == "VOTE_CASE_ERROR") {
                return res.status(err.status).json({
                    message: err.message
                })
            }

            console.log(err)

            return res.status(500).json({
                message: "Internal server error"
            })

        }
    }

    deleteAllVotes = async (req, res) => {

    }
}