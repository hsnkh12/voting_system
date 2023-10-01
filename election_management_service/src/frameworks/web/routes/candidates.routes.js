var express = require('express')
var router = express.Router()
const { verifyTokenMiddleware, verifyUserMiddleware, verifyAdminMiddleware} = require("../../../adapter/middlewares/auth.middleware")
const CandiatesController = require("../../../adapter/controllers/candidates.controller")
const CandidatesRepository = require('../../db/data-services/candidates.repo')
const CandidatesUseCase = require('../../../use-cases/candidates.case')

const candidatesRepo = new CandidatesRepository()
const candidatesUseCase = new CandidatesUseCase(candidatesRepo)
const candidatesController = new CandiatesController(candidatesUseCase)


// /candidates/

// Add new candidate: admin
router.post("/",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
candidatesController.createCandidate
)

// Get all candidates: admin
router.get("/", 
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
candidatesController.getAllCandidates
)

// Get on candidate info: admin
router.get("/:candidate_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
candidatesController.getOneCandidatebyId)

// Get on candidate info: admin, user
router.get("/:candidate_name",
verifyTokenMiddleware,
verifyUserMiddleware,
candidatesController.getOneCandidateByName)

// Update candidate info: admin
router.put("/:candidate_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
candidatesController.updateCandidate)

// Delete candidate: admin
router.delete("/:candidate_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
candidatesController.deleteCandidate)

module.exports = router