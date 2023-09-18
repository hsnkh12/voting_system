

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

            // send a request to delete all votes related to this candidate in this election

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

            const candidates = await this.electionsToCandsUseCase.findAllCandidates(election_id)
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

    
}


// const initiateVoteRequest = async (req, res) => {

//     try{
//         const { election_id, candidates} = req.body 
//         const resp = []

//         const election = await Election.findOne({
//             where:{ election_id, status: "S"},
//             attributes: ["election_id","no_of_votes_allowed_per_user"]
//         })

//         if (!election){
//             return res.sendStatus(404)
//         }

//         if (election.no_of_votes_allowed_per_user < candidates.length){
//             return res.sendStatus(400)
//         }

//         for (const candidate_id of candidates){

//             const elec_to_cand = await ElectionToCandidate.findOne({
//                 where: {id:candidate_id},
//                 attributes: ["id","candidate_name"]
//             })

//             if (!elec_to_cand){
//                 return res.sendStatus(404)
//             }

//             resp.push([elec_to_cand.id, elec_to_cand.candidate_name])
//         }

//         return res.status(200).json({user_id: req.user_id, election_id, election_to_candidates: resp})

//     } catch(err){
//         console.log(err)
//         return res.status(500).json({ 
//             message: "Internal server error" 
//         });
//     }
// }