const Canddiate = require("../../../core/models/candidates.model")


module.exports = class CandidatesRepository{


    async find(clause){
        return await Canddiate.model.findAll(clause)
    }

    async findOne(kwargs){

        if (kwargs.transaction){
            return await Canddiate.model.findOne(kwargs.candidateClause, {transaction: kwargs.transaction})
        }
        return await Canddiate.model.findOne(kwargs)
    }

    async create(data){
        return await Canddiate.model.create(data)
    }

    async save(kwargs){
        if (kwargs.transaction){
            return await kwargs.candidate.save({transaction: kwargs.transaction})
        }
        return await kwargs.save()
    }

    async destroy(clause){
        return await Canddiate.model.destroy(clause)
    }
}