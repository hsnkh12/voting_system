var express = require('express')
var router = express.Router()
const {submiteVote,
    getAllVotes,
    getOneVote,
    deleteAllVotes} = require("../controllers/votes.controllers")
const { verifyTokenMiddleware,
    verifyUserMiddleware,
    verifyAdminMiddleware,} = 
require("../middlewares/auth.middleware")



// Submit vote, user
router.post("/", 
verifyTokenMiddleware,
verifyUserMiddleware,
submiteVote)

// Get on vote, admin
router.get("/:vote_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
getOneVote)

// Get all votes for election, admin 
router.get("/election/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
getAllVotes)

// Delete all votes in election, admin, election_service
router.delete("/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
deleteAllVotes)

module.exports = router