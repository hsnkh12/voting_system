const Canddiate = require("../../../core/models/candidates.model")


module.exports = class CandidatesRepository{


    async find(clause){
        return await Canddiate.model.findAll(clause)
    }

    async findOne(clause){
        return await Canddiate.model.findOne(clause)
    }

    async create(data){
        return await Canddiate.model.create(data)
    }

    async save(object){
        return await object.save()
    }

    async destroy(clause){
        return await Canddiate.model.destroy(clause)
    }
}