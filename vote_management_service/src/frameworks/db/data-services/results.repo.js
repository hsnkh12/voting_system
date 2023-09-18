const Result = require("../../../core/models/results.model")


module.exports = class ResultsRepository {

    async find(clause){
        return await Result.model.findAll(clause)
    }

    async findOne(clause){
        return await Result.model.findOne(clause)
    }

    async create(data){
        return await Result.model.create(data)
    }

    async save(object){
        return await object.save()
    }

    async destroy(clause){
        return await Result.model.destroy(clause)
    }

}