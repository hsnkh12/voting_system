const SMSUserCode = require("../../../core/models/sms_code_user.model")


module.exports = class SMSRepository{

    async find(clause){
        return await SMSUserCode.model.findAll(clause)
    }

    async findOne(clause){
        return await SMSUserCode.model.findOne(clause)
    }

    async create(data){
        return await SMSUserCode.model.create(data)
    }

    async save(object){
        return await object.save()
    }

    async destroy(clause){
        return await SMSUserCode.model.destroy(clause)
    }
}