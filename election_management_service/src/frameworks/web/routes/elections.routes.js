var express = require('express')
var router = express.Router()
const { verifyTokenMiddleware, verifyUserMiddleware, verifyAdminMiddleware, verifyFaceIDMiddleware} = require("../../../adapter/middlewares/auth.middleware")
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
verifyFaceIDMiddleware,
electionsController.createElection)

// Start election: admin
router.post("/start/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
verifyFaceIDMiddleware,
electionsController.startElection)

// End election: admin
router.post("/end/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
verifyFaceIDMiddleware,
electionsController.endElection)


// Add candidate to election: admin
router.post("/candidates/add/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
verifyFaceIDMiddleware,
electionsToCandsController.addCandidate
)


// remove candidate from election: admin
router.post("/candidates/remove/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
verifyFaceIDMiddleware,
electionsToCandsController.removeCandidate
)


// Read all elections: admin, user
router.get("/",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyFaceIDMiddleware,
electionsController.getAllElections)

router.get("/candidate-involved/:candidate_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyFaceIDMiddleware,
electionsToCandsController.getInvolvedElections
)
// Read one election: admin, user
router.get("/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyFaceIDMiddleware,
electionsController.getOneElectionById)

// Read all candidates in an election: admin, user
router.get("/candidates/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyFaceIDMiddleware,
electionsToCandsController.getAllCandidates)

// Read one election: admin, user
router.get("/title/:title",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyFaceIDMiddleware,
electionsController.getOneElectionByTitle)


// Update election info: admin
router.put("/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
verifyFaceIDMiddleware,
electionsController.updateElection)


// Delete election: admin
router.delete("/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
verifyFaceIDMiddleware,
electionsController.destroyElection)


router.post("/init-vote-request",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyFaceIDMiddleware,
electionsToCandsController.initVote)


module.exports = router