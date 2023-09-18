const Result = require("../storage/models/results.model")
const {publishMessageToQueue} = require("../rabbitmq/services/vote_background_service")


const generateResult = async (req, res) => {

    try{

        const election_id = req.params.election_id 

        publishMessageToQueue({election_id},"generate-result")
        
        return res.send(true)

    } catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        }) 
    }
}


const getResult =  async (req, res) => {

    try{

        const election_id = req.params.election_id 

        const result = await Result.findOne({
            where: {election_id}
        })

        if (!result){
            return res.status(404).json({
                message: "Result not found"
            })
        }

        return res.json(result)

    } catch(err){

        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}



const deleteResult =  async (req, res) => {

    try{

        const election_id = req.params.election_id 

        await Result.destroy({
            where: {election_id}
        })

        return res.send(true)

    } catch(err){
        if(err.name === 'SequelizeInstanceError'){
            return res.status(404).json({
                message: "Vote not found"
            })
        }

        console.log(err)
        return res.status(500).json({ 
            message: "Internal server error" 
        });
    }
}



module.exports = {
    generateResult,
    getResult,
    deleteResult
}