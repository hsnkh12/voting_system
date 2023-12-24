const {
    ComplainCreateBody,
    ComplainFilterQuery
} = require("../../core/validators/complains.val")

module.exports = class ComplainsController{

    constructor(complainsUseCase){
        this.complainsUseCase =complainsUseCase 
    }


    getAllComplain = async (req, res) => {

        try{

            const complainQuery = new ComplainFilterQuery(req.query)

            const complains = await this.complainsUseCase.findAllComplains(complainQuery)

            return res.json(complains)

        } catch(err){

            if (err.name == "COMPLAIN_CASE_ERROR"){
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


    getOneComplain = async (req, res) => {

        try{

            const complain_id = req.params.complain_id

            const complain = await this.complainsUseCase.findOneComplain(complain_id)

            return res.json(complain)

        } catch(err){

            if (err.name == "COMPLAIN_CASE_ERROR"){
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


    createComplain = async (req, res) => {

        try{

            const user_id = req.user_id
            const { election_id, message} = req.body    
            const validator = new ComplainCreateBody(election_id, user_id, message)

            validator.validate()

            const complain = await this.complainsUseCase.createComplain(validator)

            return res.json(complain)

        } catch(err){

            if (err.name == "BODY_VALIDATION_ERROR"){
                return res.status(499).json({ 
                    message : err.message
                })
            }

            if (err.name == "COMPLAIN_CASE_ERROR"){
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
            })

        }
    }

    deleteComplain = async (req, res) => {

        try{

            const complain_id = req.params.complain_id
            await this.complainsUseCase.destroyComplain(complain_id)

            return res.json(true)

        } catch(err){

            if(err.name === 'SequelizeInstanceError'){
                return res.status(404).json({
                    message: "Election not found"
                })
            }

            console.log(err)
            return res.status(500).json({
                message: "Internal server error"
            })

        }
    }

}