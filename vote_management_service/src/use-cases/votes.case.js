


module.exports = class VotesUseCase {

    constructor(votesRepo, voteBackgroundService){
        this.votesRepo = votesRepo
        this.voteBackgroundService = voteBackgroundService
    }
}