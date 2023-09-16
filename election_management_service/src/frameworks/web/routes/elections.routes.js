var express = require('express')
var router = express.Router()
const { verifyTokenMiddleware, verifyUserMiddleware, verifyAdminMiddleware} = require("../../../adapter/middlewares/auth.middleware")
const ElectionsController = require("../../../adapter/controllers/elections.controller")
const ElectionsUseCase = require("../../../use-cases/elections.case")
const ElectionsRepository = require("../../db/data-services/elections.repo")
const ElectionsToCandsRepository = require("../../db/data-services/election_to_cands.repo")
const CandidatesRepository = require("../../db/data-services/candidates.repo")
const ElectionToCandsUseCase = require("../../../use-cases/election_to_cands.case")
const ElectionToCandsController = require("../../../adapter/controllers/election_to_candidates.controller")

const electionsRepo = new ElectionsRepository()
const eletionToCandsRepo = new ElectionsToCandsRepository()
const candidateRepostitory = new CandidatesRepository()

const electionsUseCase = new ElectionsUseCase(electionsRepo)
const electionsToCandsUseCase = new ElectionToCandsUseCase(electionsRepo, eletionToCandsRepo, candidateRepostitory)

const electionsController = new ElectionsController(electionsUseCase)
const electionsToCandsController = new ElectionToCandsController(electionsToCandsUseCase)



// Create new election: admin
router.post("/", 
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
electionsController.createElection)

// Start election: admin
router.post("/start/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
electionsController.startElection)

// End election: admin
router.post("/end/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
electionsController.endElection)


// Add candidate to election: admin
router.post("/add/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
electionsToCandsController.addCandidate
)


// remove candidate from election: admin
router.post("/remove/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
electionsToCandsController.removeCandidate
)


// Read all elections: admin, user
router.get("/",
verifyTokenMiddleware,
verifyUserMiddleware,
electionsController.getAllElections)

// Read one election: admin, user
router.get("/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
electionsController.getOneElectionById)

// Read all candidates in an election: admin, user
router.get("/:election_id/candidates",
verifyTokenMiddleware,
verifyUserMiddleware,
electionsToCandsController.getAllCandidates)

// Read one election: admin, user
router.get("/title/:title",
verifyTokenMiddleware,
verifyUserMiddleware,
electionsController.getOneElectionByTitle)


// Update election info: admin
router.put("/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
electionsController.updateElection)


// Delete election: admin
router.delete("/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
electionsController.destroyElection)


// router.post("/init-vote-request",
// verifyTokenMiddleware,
// verifyUserMiddleware,
// electionsController.initVoteRequest)


module.exports = router