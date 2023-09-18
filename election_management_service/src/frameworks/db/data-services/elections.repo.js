const Election = require("../../../core/models/elections.model.js")



module.exports = class ElectionsRepository{

    async find(clause){
        return await Election.model.findAll(clause)
    }

    async findOne(kwargs){

        if (kwargs.transaction){
            return await Election.model.findOne(kwargs.candidateClause, {transaction: kwargs.transaction})
        }
        return await Election.model.findOne(kwargs)
    }

    async create(data){
        return await Election.model.create(data)
    }

    async save(kwargs){
        if (kwargs.transaction){
            return await kwargs.election.save({transaction: kwargs.transaction})
        }
        return await kwargs.save()
    }

    async destroy(clause){
        return await Election.model.destroy(clause)
    }
}