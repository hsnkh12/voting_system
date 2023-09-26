const db = require("../sequelize.db")
const ElectionToCandidate = require("../../../core/models/election_to_candidate.model")

module.exports = class ElectionToCandsRepository{


    async startTransaction(){
        return await db.transaction()
    }

    async findOrCreate(kwargs){
        return await ElectionToCandidate.model.findOrCreate(kwargs.electionToCandClause)
    }

    async find(kwargs){
        return await ElectionToCandidate.model.findAll(kwargs)

    }

    async findOne(clause){
        return await ElectionToCandidate.model.findOne(clause)
    }

    async destroy(kwargs){
        return await ElectionToCandidate.model.destroy(kwargs.electionToCandClause, {transaction: kwargs.transaction})
    }

}