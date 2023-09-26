


module.exports = class ElectionsUseCase{

    constructor(electionsRepo, electionToCandsRepo, candidatesRepo){
        this.electionsRepo =electionsRepo 
        this.electionToCandsRepo = electionToCandsRepo
        this.candidatesRepo = candidatesRepo
    }


    async add(kwargs){

        const transaction = await this.electionToCandsRepo.startTransaction()


        const electionClause = {
            where:{ election_id: kwargs.election_id},
            attributes: ["election_id", "no_of_candidates"]
        }
        const election = await this.electionsRepo.findOne({electionClause, transaction})

        if (!election){
            await transaction.rollback()
            return this.throwError("Election not found", 404)
        }

        const candidateClause = {
            where: { candidate_id: kwargs.candidate_id},
            attributes: ["candidate_id","candidate_name"]
        }

        const candidate = await this.candidatesRepo.findOne({candidateClause, transaction})

        if (!candidate) {
            await transaction.rollback()
            return this.throwError("Candidate not found", 404)
        }

        const electionToCandClause = {
            where: {election_id: kwargs.election_id, candidate_id: kwargs.candidate_id},
            defaults : {election_id:kwargs.election_id, 
                candidate_id:kwargs.candidate_id, 
                candidate_name: candidate.candidate_name
            },
            transaction
        }

        const [record, created] = await this.electionToCandsRepo.findOrCreate({electionToCandClause, transaction})
        if (created == true){
            election.no_of_candidates = election.no_of_candidates + 1
            await this.electionsRepo.save({election, transaction})
        } else {
            await transaction.rollback()
            return this.throwError("Candidate has already been added to this election", 400)
        }

        await transaction.commit()
        return record
    }

    async remove(kwargs){


        const transaction = await this.electionToCandsRepo.startTransaction()


        const electionClause = {
            where:{ election_id: kwargs.election_id},
            attributes: ["election_id", "no_of_candidates"]
        }
        const election = await this.electionsRepo.findOne({electionClause, transaction})

        if (!election){
            await transaction.rollback()
            return this.throwError("Election not found", 404)
        }

        const candidateClause = {
            where: { candidate_id: kwargs.candidate_id},
            attributes: ["candidate_id","candidate_name"]
        }

        const candidate = await this.candidatesRepo.findOne({candidateClause, transaction})

        if (!candidate) {
            await transaction.rollback()
            return this.throwError("Candidate not found", 404)
        }

        const electionToCandClause = {
            where: {election_id: kwargs.election_id, candidate_id: kwargs.candidate_id}
        }

        const result = await this.electionToCandsRepo.destroy({electionToCandClause, transaction})

        if (result == true){
            election.no_of_candidates = election.no_of_candidates - 1
            await this.electionsRepo.save({election, transaction})
        } else {
            return this.throwError("Candidate not found in this election", 404)
        }

        await transaction.commit()
    }

    async findAllCandidates(election_id){

        const clause = {
            where: {election_id},
            attributes: ["id","election_id","candidate_id","candidate_name"],
        }

        const electionToCandidates = await this.electionToCandsRepo.find(clause)

        return electionToCandidates 

    }

    async validateVote(kwargs){

        const resp = []

        const election = await this.electionsRepo.findOne({
            where: {election_id: kwargs.election_id},
            attributes: ["election_id","no_of_votes_allowed_per_user", "status"]
        })

        if (!election){
            return this.throwError("Election is not found", 404)
        }

        if(election.status != "S"){
            return this.throwError("Election should be in start status", 400)
        }

        if (election.no_of_votes_allowed_per_user < kwargs.candidates.length){
            return this.throwError("Exceded allowed number of votes per user", 400)
        } 

        for (const candidate_id of kwargs.candidates){

            const elec_to_cand = await this.electionToCandsRepo.findOne({
                where: {candidate_id:candidate_id, election_id: election.election_id},
                attributes: ["id","candidate_name"]
            })

            if (!elec_to_cand){
                return this.throwError("Candidate with id '"+candidate_id+"' is not found in this election", 404)
            }

            resp.push([elec_to_cand.id, elec_to_cand.candidate_name])
        }

        return resp

    }


    throwError(message, status){

        const err = new Error()
        err.name = "ELECTION_CANDIDATE_CASE_ERROR"
        err.message = message
        err.status = status
        throw err
    }
}