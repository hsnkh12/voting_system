


module.exports = class ElectionsUseCase{

    constructor(electionsRepo){
        this.electionsRepo =electionsRepo 
    }


    createElection = async (kwargs) => {

        kwargs.status = "P"

        const candidate = await this.electionsRepo.create(kwargs)

        return candidate

    }

    start = async (kwargs) => {

        const clause = {
            where:{election_id: kwargs.election_id},
            attributes: ["election_id","status","start_date","expected_end_date"]
        }

        try{
           kwargs.expected_end_date = new Date(kwargs.expected_end_date) 
        } catch(err){
            return this.throwError("Invalid expected_end_date field",400)
        }

        const election = await this.electionsRepo.findOne(clause)

        if(!election){
            return this.throwError("Election not found", 404)
        }

        election.expected_end_date = kwargs.expected_end_date
        election.status = "S"
        election.start_date = new Date()

        await this.electionsRepo.save(election)

        return election

    }

    end = async (election_id) => {

        const clause = {
            where: {election_id},
            attributes: ["election_id","status","end_date"]
        }

        const election = await this.electionsRepo.findOne(clause)

        if (election.status != "S"){
            return this.throwError("Election's status should be on start to end it", 400)
        }

        election.status = "E"
        election.end_date = new Date()

        await this.electionsRepo.save(election)

        return election

    }

    findAllElections = async (query) => {

        const page = Number.isInteger(query.definePage())? query.definePage() : 1
        const offset = (page - 1) * 50;

        const clause = {
            offset,
            limit: 50,
            where: query.defineClause(),
            order: [query.defineSort()],
            attributes: ["election_id","election_type","title","start_date","end_date","expected_end_date","status","no_of_candidates"]
        }

        const elections = await this.electionsRepo.find(clause)

        return elections

    }

    findOneElectionById = async (election_id) => {

        const clause = {
            where:{ election_id}
        }

        const election = await this.electionsRepo.findOne(clause)

        if(!election){
            return this.throwError("Election with this id is not found", 404)
        }

        return election

    }

    findOneElectionByTitle = async (title) =>{

        const clause = {
            where:{ title}
        }

        const election = await this.electionsRepo.findOne(clause)

        if(!election){
            return this.throwError("Election with this title is not found", 404)
        }

        return election

    }

    updateElection = async (kwargs) => {

        const attrs = ["title","election_type","description"]

        const clause = {
            where:{election_id:kwargs.election_id},
            attributes:attrs
        }

        const election = await this.electionsRepo.findOne(clause)

        if (!election){
            return this.throwError("Election not found",404)
        }

        for (const field in kwargs.updateFields) {
            if (!attrs.includes(field)){
                return this.throwError("'"+field+"' field cannot be updated", 400) 
            }
            if (kwargs.updateFields.hasOwnProperty(field) ) {
                election[field] = kwargs.updateFields[field];
            } 
        }

        election["election_id"] = kwargs.election_id

        await this.electionsRepo.save(election)

        return true
    }

    destroyElection = async (election_id) => {

        await this.electionsRepo.destroy({where:{election_id}})

        return true 

    }

    throwError(message, status){

        const err = new Error()
        err.name = "ELECTION_CASE_ERROR"
        err.message = message
        err.status = status
        throw err
    }
}