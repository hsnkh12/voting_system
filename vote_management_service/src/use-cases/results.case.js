


module.exports = class ResultsUseCase {

    constructor(resultsRepo, voteBackgroundService){
        this.resultsRepo = resultsRepo
        this.voteBackgroundService = voteBackgroundService
    }
}