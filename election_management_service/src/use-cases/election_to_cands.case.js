


module.exports = class ElectionsUseCase{

    constructor(electionsRepo, electionToCandsRepo, candidatesRepo){
        this.electionsRepo =electionsRepo 
        this.electionToCandsRepo = electionToCandsRepo
        this.candidatesRepo = candidatesRepo
    }
}