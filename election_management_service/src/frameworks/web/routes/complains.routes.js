var express = require('express')
var router = express.Router()
const ComplainsController = require("../../../adapter/controllers/complains.controller")
const ComplainsUseCase = require("../../../use-cases/complains.case")
const ComplainsRepository = require("../../db/data-services/complains.repo")
const { verifyTokenMiddleware, verifyUserMiddleware, verifyAdminMiddleware, verifyFaceIDMiddleware} = require("../../../adapter/middlewares/auth.middleware")
const complainsRepo = new ComplainsRepository()
const complainsUseCase = new ComplainsUseCase(complainsRepo)
const complainsController = new ComplainsController(complainsUseCase)

// Create a complain: user
router.post("/", 
verifyTokenMiddleware,
verifyUserMiddleware,
verifyFaceIDMiddleware,
complainsController.createComplain)

// Read all complains: admin
router.get("/", 
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
verifyFaceIDMiddleware,
complainsController.getAllComplain
)

// Read one complain: admin
router.get("/:id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
verifyFaceIDMiddleware,
complainsController.getOneComplain)

// Delete complain: admin
router.delete("/:id", 
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
verifyFaceIDMiddleware,
complainsController.deleteComplain)

module.exports = router