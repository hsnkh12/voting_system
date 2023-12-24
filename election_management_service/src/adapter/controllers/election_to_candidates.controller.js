

module.exports = class ElectionToCandsController{

    constructor(electionsToCandsUseCase){
        this.electionsToCandsUseCase =electionsToCandsUseCase 
    }


    addCandidate = async (req, res) => {

        try {

            const election_id = req.params.election_id 
            const candidate_id = req.body.candidate_id 

            if(!candidate_id){
                this.electionsToCandsUseCase.throwError("candidate_id field is missing", 400)
            }

            const electionToCand = await this.electionsToCandsUseCase.add({election_id, candidate_id})

            return res.json(electionToCand)

        } catch(err){

            if (err.name == "ELECTION_CANDIDATE_CASE_ERROR"){
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

    removeCandidate = async (req, res) => {

        try {

            const election_id = req.params.election_id 
            const candidate_id = req.body.candidate_id 

            if(!candidate_id){
                this.electionsToCandsUseCase.throwError("candidate_id field is missing", 400)
            }

            await this.electionsToCandsUseCase.remove({election_id, candidate_id})

            return res.send(true)

        } catch(err){

            if (err.name == "ELECTION_CANDIDATE_CASE_ERROR"){
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

    getAllCandidates = async (req, res) => {

        try {

            const election_id = req.params.election_id
            const query = req.query 

            const candidates = await this.electionsToCandsUseCase.findAllCandidates(election_id, query)
            return res.json(candidates)


        } catch(err){

            if (err.name == "ELECTION_CANDIDATE_CASE_ERROR"){
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

    getInvolvedElections = async (req, res) => {

        try{

            const {candidate_id} = req.params 

            const r = await this.electionsToCandsUseCase.findAllInvolvedElections(candidate_id)

            return res.json(r)

        } catch(err){
            console.log(err)
            return res.status(500).json({
                message: "Internal server error"
            })

        }
    }


    initVote  = async (req, res) => {

        try{
            const {election_id, candidates } = req.body 

            if (!election_id || !candidates){
                return this.electionsToCandsUseCase.throwError("election_id and candidates fields are required", 400)
            }

            const resp = await this.electionsToCandsUseCase.validateVote({election_id, candidates})

            return res.json(resp)

        } catch(err) {

            if (err.name == "ELECTION_CANDIDATE_CASE_ERROR"){
                return res.status(err.status).json({ 
                    message : err.message
                })
            }

            console.log(err)

            return res.status(500).json({ 
                message: "Internal server error" 
            });
            

        }
    }

    
}
