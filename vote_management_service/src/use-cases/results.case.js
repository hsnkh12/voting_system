


module.exports = class ResultsUseCase {

    constructor(resultsRepo, resultsPublisher){
        this.resultsRepo = resultsRepo
        this.resultsPublisher =resultsPublisher 
    }

    async publishResult(election_id){

        await this.resultsPublisher.publishMessageToQueue({election_id},"generate-result")

        return true
    }

    async findOneResult(election_id){

        const result = await this.resultsRepo.findOne({where: {election_id}})

        return result
    }

    async destroyResult(election_id){

        await this.resultsRepo.destroy({ where: {election_id}})

        return true
    }


    throwError(message, status){

        const err = new Error()
        err.name = "RESULT_CASE_ERROR"
        err.message = message
        err.status = status
        throw err
    }
}