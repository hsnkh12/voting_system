const {
    ElectionFilterQuery,
    ElectionCreateBody
} = require("../../core/validators/election.val")


module.exports = class ElectionsController{

    constructor(electionsUseCase){
        this.electionsUseCase =electionsUseCase 
    }

    createElection = async (req, res) => {

        try {

            const {title, election_type, description, no_of_votes_allowed_per_user} = req.body
            const validator = new ElectionCreateBody(title, election_type, description, no_of_votes_allowed_per_user)
            validator.validate()

            const candidate = await this.electionsUseCase.createElection(validator)
            return res.json(candidate)

        } catch(err){

            if (err.name == "SequelizeUniqueConstraintError"){
                return res.status(409).json({
                    message:'Election with this title already exists'
                });
            }

            if (err.name == "BODY_VALIDATION_ERROR"){
                return res.status(400).json({ 
                    message : err.message
                })
            }

            if (err.name == "ELECTION_CASE_ERROR"){
                return res.status(err.status).json({ 
                    message : err.message
                })
            }
    
            if (err.name == "SequelizeValidationError"){
                return res.status(400).json({
                    message: err.message
                });
            }
    
            console.log(err)
            return res.status(500).json({
                message: "Internal server error"
            })

        }
    }

    startElection = async (req, res) => {

        try {
            const election_id = req.params.election_id
            const {expected_end_date} = req.body

            if (!expected_end_date){
                return this.electionsUseCase.throwError("expected_end_date field is missing", 400)
            }

            const election = await this.electionsUseCase.start({election_id, expected_end_date})

            return res.send(election)

        } catch(err){

            if (err.name == "ELECTION_CASE_ERROR"){
                return res.status(err.status).json({ 
                    message : err.message
                })
            }

            if (err.name == "SequelizeValidationError"){
                return res.status(400).json({
                    message: err.message
                });
            }
    
            console.log(err)
            return res.status(500).json({
                message: "Internal server error"
            })
            
        }
    }

    endElection = async (req, res) => {

        try {

            const election_id = req.params.election_id

            const election = await this.electionsUseCase.end(election_id)

            return res.send(election)

        } catch(err){

            if (err.name == "ELECTION_CASE_ERROR"){
                return res.status(err.status).json({ 
                    message : err.message
                })
            }

            if (err.name == "SequelizeValidationError"){
                return res.status(400).json({
                    message: err.message
                });
            }
    
            console.log(err)
            return res.status(500).json({
                message: "Internal server error"
            })
            
        }
    }

    getAllElections = async (req, res) => {

        try {

            const electionQuery = new ElectionFilterQuery(req.query)

            const elections = await this.electionsUseCase.findAllElections(electionQuery)

            return res.json(elections)

        } catch(err){

            if (err.name == "ELECTION_CASE_ERROR"){
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

    getOneElectionById = async (req, res) => {

        try {

            const election_id = req.params.election_id 

            const election = await this.electionsUseCase.findOneElectionById(election_id)

            return res.json(election)

        } catch(err){

            if (err.name == "ELECTION_CASE_ERROR"){
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

    getOneElectionByTitle = async (req, res) => {

        try {

            const title = req.params.title

            const election = await this.electionsUseCase.findOneElectionByTitle(title)

            return res.json(election)

        } catch(err){

            if (err.name == "ELECTION_CASE_ERROR"){
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

    updateElection = async (req, res) => {

        try {
            const election_id = req.params.election_id 
            const updateFields = req.body; 

            await this.electionsUseCase.updateElection({election_id, updateFields})

            return res.send(true)

        } catch(err){

            if (err.name == "ELECTION_CASE_ERROR"){
                return res.status(err.status).json({ 
                    message : err.message
                })
            }

            if (err.name == "SequelizeUniqueConstraintError"){
                return res.status(409).json({
                    message:'Election with this title already exists'
                });
            }
            
            if (err.name == "SequelizeValidationError"){
                return res.status(400).json({
                    message: err.message
                });
            }
    
            console.log(err)
            return res.status(500).json({ 
                message: "Internal server error" 
            });
            
        }
    }

    destroyElection = async (req, res) => {

        try {
            const election_id = req.params.election_id 

            await this.electionsUseCase.destroyElection(election_id)

            // send a request to delete all votes in this election 

            return res.send(true)

        } catch(err){

            if(err.name === 'SequelizeInstanceError'){
                return res.status(404).json({
                    message: "Election not found"
                })
            }
    
            console.log(err)
            return res.status(500).json({ 
                message: "Internal server error" 
            });
            
        }
    }
}