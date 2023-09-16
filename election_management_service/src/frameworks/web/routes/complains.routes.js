var express = require('express')
var router = express.Router()
const ComplainsController = require("../../../adapter/controllers/complains.controller")
const ComplainsUseCase = require("../../../use-cases/complains.case")
const ComplainsRepository = require("../../db/data-services/complains.repo")

const complainsRepo = new ComplainsRepository()
const complainsUseCase = new complainUseCase(complainsRepo)
const complainsController = new ComplainsController(complainsUseCase)

// Create a complain: user
router.post("/")

// Read all complains: admin
router.get("/")

// Read one complain: admin
router.get("/:id")

// Delete complain: admin
router.delete("/:id")

module.exports = router