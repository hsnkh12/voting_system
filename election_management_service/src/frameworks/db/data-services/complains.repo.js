const Complain = require("../../../core/models/complains.model")



module.exports = class ComplainsRepository{

    async find(clause){
        return await Complain.model.findAll(clause)
    }

    async findOne(clause){
        return await Complain.model.findOne(clause)
    }

    async create(data){
        return await Complain.model.create(data)
    }

    async save(object){
        return await object.save()
    }

    async destroy(clause){
        return await Complain.model.destroy(clause)
    }
}