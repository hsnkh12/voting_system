

module.exports = class ResultsController {

    constructor(resultsUseCase){
        this.resultsUseCase = resultsUseCase
    }


    generateResult = async (req, res) => {
        try{

            const election_id = req.params.election_id 

            await this.resultsUseCase.publishResult(election_id)

            return res.send(true)

        } catch(err){

            console.log(err)

            return res.status(500).json({
                message: "Internal server error"
            })

        }
    }

    getOneResult = async (req, res) => {
        try{

            const election_id = req.params.election_id 

            const result = await this.resultsUseCase.findOneResult(election_id)

            return res.json(result)

        } catch(err){

            if (err.name == "RESULT_CASE_ERROR"){
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

    deleteResult = async (req, res) => {

        try{

            const election_id = req.params.election_id 

            await this.resultsUseCase.destroyResult(election_id)

            return res.json(true)

        } catch(err){

            if(err.name === 'SequelizeInstanceError'){
                return res.status(404).json({
                    message: "Vote not found"
                })
            }

            console.log(err)

            return res.status(500).json({
                message: "Internal server error"
            })
            
        }
    }

}