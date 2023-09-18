var express = require('express')
var router = express.Router()
const ComplainsController = require("../../../adapter/controllers/complains.controller")
const ComplainsUseCase = require("../../../use-cases/complains.case")
const ComplainsRepository = require("../../db/data-services/complains.repo")
const { verifyTokenMiddleware, verifyUserMiddleware, verifyAdminMiddleware} = require("../../../adapter/middlewares/auth.middleware")
const complainsRepo = new ComplainsRepository()
const complainsUseCase = new ComplainsUseCase(complainsRepo)
const complainsController = new ComplainsController(complainsUseCase)

// Create a complain: user
router.post("/", 
verifyTokenMiddleware,
verifyUserMiddleware,
complainsController.createComplain)

// Read all complains: admin
router.get("/", 
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
complainsController.getAllComplain
)

// Read one complain: admin
router.get("/:id",
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
complainsController.getOneComplain)

// Delete complain: admin
router.delete("/:id", 
verifyTokenMiddleware,
verifyUserMiddleware,
verifyAdminMiddleware,
complainsController.deleteComplain)

module.exports = router