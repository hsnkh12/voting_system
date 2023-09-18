const Vote = require("../../../core/models/votes.model")


module.exports = class VotesRepository {

    async find(clause){
        return await Vote.model.findAll(clause)
    }

    async findOne(clause){
        return await Vote.model.findOne(clause)
    }

    async create(data){
        return await Vote.model.create(data)
    }

    async save(object){
        return await object.save()
    }

    async destroy(clause){
        return await Vote.model.destroy(clause)
    }

}