const Election = require("../../../core/models/elections.model.js")



module.exports = class ElectionsRepository{

    async find(clause){
        return await Election.model.findAll(clause)
    }

    async findOne(clause){
        return await Election.model.findOne(clause)
    }

    async create(data){
        return await Election.model.create(data)
    }

    async save(object){
        return await object.save()
    }

    async destroy(clause){
        return await Election.model.destroy(clause)
    }
}