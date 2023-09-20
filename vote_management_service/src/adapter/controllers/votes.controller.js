


module.exports = class VotesController {

    constructor(votesUseCase){
        this.votesUseCase = votesUseCase
    }


    submitVote = async (req, res) => {

        try{

            const {election_id, candidates} = req.body 

            if (!election_id || !candidates){
                return res.status(400).json({
                    message: "election_id and candidates required in body"
                })
            }

            await this.votesUseCase.publishVote({election_id, candidates, headers: req.headers})

            return res.send(true) 

        } catch(err){

            if (err.name == "AxiosError"){
                return res.status(400).json({
                    message: "Invalid submission"
                })
            }

            if (err.name == "VOTE_CASE_ERROR"){
                return res.status(err.status).json({ 
                    message : err.message
                })
            }

            console.log(err)

            return res.status(500).json({
                message: "Internal server error"
            })
            
        }
    }

    getOneVote = async (req, res) => {

        try{

            const vote_id = req.params.vote_id

            const vote = await this.votesUseCase.findOneVote(vote_id)

            return res.json(vote)

        } catch(err){

            if (err.name == "VOTE_CASE_ERROR"){
                return res.status(err.status).json({ 
                    message : err.message
                })
            }

            console.log(err)

            return res.status(500).json({
                message: "Internal server error"
            })
            
        }
    }

    getAllVotes = async (req, res) => {

        try{

            const election_id = req.params.election_id

            const votes = await this.votesUseCase.findAllVotes(election_id)

            return res.json(votes)

        } catch(err){

            if (err.name == "VOTE_CASE_ERROR"){
                return res.status(err.status).json({ 
                    message : err.message
                })
            }

            console.log(err)

            return res.status(500).json({
                message: "Internal server error"
            })
            
        }
    }
}