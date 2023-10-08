var express = require('express')
var router = express.Router()
const { verifyTokenMiddleware,
    verifyUserMiddleware,
    verifyAdminMiddleware,} = 
require("../../../adapter/middlewares/auth.middleware")

const ResultsController = require("../../../adapter/controllers/results.controller")
const ResultsUseCase = require("../../../use-cases/results.case")
const ResultsRepository = require("../../db/data-services/results.repo")
const ResultsPublisher = require("../../rabbitmq/pubs/results.pub")

const resultsRepo = new ResultsRepository()
const resultsPublisher = new ResultsPublisher()
const resultsUseCase = new ResultsUseCase(resultsRepo, resultsPublisher)
const resultsController = new ResultsController(resultsUseCase)



// Generate result. admin
router.post("/election/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
resultsController.generateResult)

// Get one result. user, admin 
router.get("/election/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
resultsController.getOneResult)


// // Delete result. admin, election_service
// router.delete("election/:election_id",
// verifyTokenMiddleware,
// verifyUserMiddleware,
// verifyAdminMiddleware,
// resultsController.deleteResult)


module.exports = router