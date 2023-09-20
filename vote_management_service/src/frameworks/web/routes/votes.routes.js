var express = require('express')
var router = express.Router()

const { verifyTokenMiddleware,
    verifyUserMiddleware,
    verifyAdminMiddleware,} = 
require("../../../adapter/middlewares/auth.middleware")

const VotesController = require("../../../adapter/controllers/votes.controller")
const VotesUseCase = require("../../../use-cases/votes.case")
const VotesRepository = require("../../db/data-services/votes.repo")
const VotesPublisher = require("../../rabbitmq/pubs/votes.pub.js")
const ResultsPublisher = require("../../rabbitmq/pubs/results.pub")

const votesRepo = new VotesRepository()
const votesPublisher = new VotesPublisher()
const resultsPublisher = new ResultsPublisher()
const votesUseCase = new VotesUseCase(votesRepo, votesPublisher, resultsPublisher)
const votesController = new VotesController(votesUseCase)

// Submit vote, user
router.post("/", 
verifyTokenMiddleware,
verifyUserMiddleware,
votesController.submitVote
)

// Get on vote, admin
router.get("/:vote_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
votesController.getOneVote
)

// Get all votes for election, admin 
router.get("/election/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
votesController.getAllVotes
)

// Delete all votes in election, admin, election_service
// router.delete("/:election_id",
// verifyTokenMiddleware,
// verifyUserMiddleware,
// verifyAdminMiddleware,
// )

module.exports = router