const User = require("../../../core/models/users.model")

class UsersRepository{

    async find(clause){
        return await User.model.findAll(clause)
    }

    async findOne(clause){
        return await User.model.findOne(clause)
    }

    async create(data){
        return await User.model.create(data)
    }

    async save(object){
        return await object.save()
    }

    async destroy(clause){
        return await User.model.destroy(clause)
    }
}


module.exports = UsersRepository