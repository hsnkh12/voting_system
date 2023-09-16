var express = require('express')
var router = express.Router()
const { verifyTokenMiddleware,
    verifyUserMiddleware,
    verifyAdminMiddleware,} = 
require("../middlewares/auth.middleware")
const {
    generateResult,
    getResult,
    deleteResult
} = require("../controllers/results.controllers")



// Generate result. admin
router.post("/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
generateResult)


// Get results. user, admin 
router.get("/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
getResult)


// Delete result. admin, election_service
router.delete("/:election_id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
deleteResult)


module.exports = router