const {CandidateCreateBody, CandidateFilterQuery} = require("../../core/validators/candidates.val")


module.exports = class CanddiatesController{

    constructor(candidatesUseCase){
        this.candidatseUseCase = candidatesUseCase
    }

    createCandidate = async (req, res) =>{
        try{
            const {candidate_name, first_name, last_name, email, image_url} = req.body
            const validator = new CandidateCreateBody(candidate_name, first_name, last_name, email, image_url)
            validator.validate()

            const candidate = await this.candidatseUseCase.createCandidate(validator)

            return res.json(candidate)

        } catch(err){

            if (err.name == "SequelizeUniqueConstraintError"){
                return res.status(409).json({
                    message:'Canddiate with this name/email already exists'
                });
            }

            if (err.name == "BODY_VALIDATION_ERROR"){
                return res.status(400).json({ 
                    message : err.message
                })
            }

            if (err.name == "CANDIDATE_CASE_ERROR"){
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

    getAllCandidates = async (req, res) =>{
        try{
            const query = new CandidateFilterQuery(req.query)

            const candidates = await this.candidatseUseCase.findAllCandidates(query)

            return res.json(candidates)

        } catch(err){

            if (err.name == "CANDIDATE_CASE_ERROR"){
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

    getOneCandidatebyId = async (req, res) =>{
        try{

            const candidate_id = req.params.candidate_id

            const candidate = await this.candidatseUseCase.findOneCandidateById(candidate_id)

            return res.json(candidate)

        } catch(err){

            if (err.name == "CANDIDATE_CASE_ERROR"){
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

    getOneCandidateByName = async (req, res) =>{
        try{

            const candidate_name = req.params.candidate_name

            const candidate = await this.candidatseUseCase.findOneCandidateByName(candidate_name)

            return res.json(candidate)

        } catch(err){

            if (err.name == "CANDIDATE_CASE_ERROR"){
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

    updateCandidate = async (req, res) =>{
        try{

            const candidate_id = req.params.candidate_id 
            const updateFields = req.body; 

            await this.candidatseUseCase.updateCandidate({candidate_id, updateFields})

            return res.send(true)

        } catch(err){

            if (err.name == "SequelizeUniqueConstraintError"){
                return res.status(409).json({
                    message:'Canddiate with this name/email already exists'
                });
            }

            if (err.name == "SequelizeValidationError"){
                return res.status(400).json({
                    message: err.message
                });
            }


            if (err.name == "CANDIDATE_CASE_ERROR"){
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

    deleteCandidate = async (req, res) =>{
        try{

            const candidate_id = req.params.candidate_id 

            await this.candidatseUseCase.destroyCandidate(candidate_id)

            return res.send(true)

        } catch(err){

            if(err.name === 'SequelizeInstanceError'){
                return res.status(404).json({
                    message: err.message 
                })
            }

            if (err.name == "CANDIDATE_CASE_ERROR"){
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
