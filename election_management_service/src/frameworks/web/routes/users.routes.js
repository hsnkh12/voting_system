var express = require('express')
var router = express.Router()
const { verifyTokenMiddleware, verifyUserMiddleware, verifyAdminMiddleware} = require("../../../adapter/middlewares/auth.middleware")
const UsersController = require("../../../adapter/controllers/users.controller")
const SMSUseCase = require("../../../use-cases/sms.case")
const UsersUseCase = require("../../../use-cases/users.case")
const UsersRepository = require("../../db/data-services/users.repo")
const SMSRepository = require("../../db/data-services/sms.repo")


const usersRepo = new UsersRepository()
const smsRepo = new SMSRepository()
const usersUseCase = new UsersUseCase(usersRepo)
const smsUseCase = new SMSUseCase(smsRepo, usersRepo)

const usersController = new UsersController(usersUseCase, smsUseCase)



// /users/
router.get("/", 
verifyTokenMiddleware, 
verifyUserMiddleware, 
verifyAdminMiddleware,
usersController.getAllUsers)

// Get one user details: admin, user
router.get("/:user_id",
verifyTokenMiddleware, 
verifyUserMiddleware, 
usersController.getOneUserById)


// Get one user details: admin, user
router.get("/username/:username",
verifyTokenMiddleware, 
verifyUserMiddleware, 
verifyAdminMiddleware,
usersController.getOneUserByUsername)


// Update user info: admin, user
router.put("/:user_id",
verifyTokenMiddleware, 
verifyUserMiddleware, 
usersController.updateUser)

// Delete user: admin, user
router.delete("/:user_id",
verifyTokenMiddleware, 
verifyUserMiddleware, 
usersController.deleteUser)

// Reset password: admin, user
router.post("/reset-password",
verifyTokenMiddleware, 
verifyUserMiddleware, 
usersController.resetPassword)

// verify face id: face rec service 
router.post("/verify-face-signup", 
usersController.verifyFaceIdOnSignup)

// verify sms code: admin, user
router.post("/verify-sms-code", 
usersController.verifySMSCode)

// signin: admin, user
router.post("/signin", 
usersController.signin)

// signup: admin, user
router.post("/signup", 
usersController.signup)

// signout: admin, user
// router.post("/signout", 
// verifyTokenMiddleware, 
// verifyUserMiddleware,
// usersController.signout)


module.exports = router