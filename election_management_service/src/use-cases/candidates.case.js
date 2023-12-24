


module.exports = class CandidatesUseCase{

    constructor(candidateRepo){
        this.candidateRepo =candidateRepo 
    }


    createCandidate = async (kwargs) => {

        kwargs.date_added = new Date()

        const candidate = await this.candidateRepo.create(kwargs)

        return candidate

    }

    findAllCandidates = async (query) => {

        const page = Number.isInteger(query.definePage())? query.definePage() : 1
        const offset = (page - 1) * 50;

        const clause = {
            where: {...query.defineClause()},
            order: [query.defineSort()],
        }

        const candidates = await this.candidateRepo.find(clause)

        return candidates

    }

    findOneCandidateById = async (candidate_id) => {

        const clause = {
            where: {candidate_id}
        }

        const candidate = await this.candidateRepo.findOne(clause)

        if(!candidate){
            return this.throwError("Candidate with this id not found", 404)
        }

        return candidate

    }

    findOneCandidateByName = async (candidate_name) => {

        const clause = {
            where: {candidate_name}
        }

        const candidate = await this.candidateRepo.findOne(clause)

        if(!candidate){
            return this.throwError("Candidate with this name not found found", 404)
        }

        return candidate

    }

    updateCandidate = async(kwargs) => {

        const attrs = ["candidate_id","candidate_name","first_name","last_name","image_url","email"]

        const clause = {
            where: {candidate_id: kwargs.candidate_id},
            attributes: attrs
        }

        const candidate = await this.candidateRepo.findOne(clause)

        if(!candidate){
            return this.throwError("Candidate not found found", 404)
        }

        for (const field in kwargs.updateFields) {
            if (!attrs.includes(field)){
                return this.throwError("'"+field+"' field cannot be updated", 400) 
            }
            if (kwargs.updateFields.hasOwnProperty(field) ) {
                candidate[field] = kwargs.updateFields[field];
            } 
        }

        candidate["candidate_id"] = kwargs.candidate_id

        await this.candidateRepo.save(candidate)

        return true

    }

    destroyCandidate = async(candidate_id) => {

        await this.candidateRepo.destroy({
            where: {candidate_id}
        })

        return true
    }

    throwError(message, status){

        const err = new Error()
        err.name = "CANDIDATE_CASE_ERROR"
        err.message = message
        err.status = status
        throw err
    }
}