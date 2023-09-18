


module.exports = class ComplainsUseCase{

    constructor(complainsRepo){
        this.complainsRepo =complainsRepo 
    }


    async findAllComplains(query){

        const page = Number.isInteger(query.definePage())? query.definePage() : 1
        const offset = (page - 1) * 50;

        const clause = {
            offset,
            limit: 50,
            where: query.defineClause(),
            order: [query.defineSort()],
        }

        const complains = await this.complainsRepo.find(clause)

        return complains

    }

    async findOneComplain(complain_id){

        const complain = await this.complainsRepo.findOne({where: {complain_id}})

        if(!complain){
            return this.throwError("Complain with this id is not found", 404)
        }

        return complain

    }

    async createComplain(kwargs){

        kwargs.date_added = new Date()
        const complain = await this.complainsRepo.create(kwargs)
        return complain

    }

    async deleteComplain(complain_id){

        await this.complainsRepo.destroy({where: {complain_id}})

        return true

    }

    throwError(message, status){

        const err = new Error()
        err.name = "COMPLAIN_CASE_ERROR"
        err.message = message
        err.status = status
        throw err
    }
}