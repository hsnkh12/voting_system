var express = require('express')
var router = express.Router()
const { verifyTokenMiddleware, verifyUserMiddleware, verifyAdminMiddleware} = require("../../../adapter/middlewares/auth.middleware")
const UsersController = require("../../../adapter/controllers/users.controller")
const SMSUseCase = require("../../../use-cases/sms.case")
const UsersUseCase = require("../../../use-cases/users.case")
const UsersRepository = require("../../db/data-services/users.repo")
const SMSRepository = require("../../db/data-services/sms.repo")
const EmailUseCase = require("../../../use-cases/email.case")

const usersRepo = new UsersRepository()
const smsRepo = new SMSRepository()
const emailUseCase = new EmailUseCase()
const usersUseCase = new UsersUseCase(usersRepo, emailUseCase)
const smsUseCase = new SMSUseCase(smsRepo, usersRepo)

const usersController = new UsersController(usersUseCase, smsUseCase)



// /users/
router.get("/", 
verifyTokenMiddleware, 
verifyUserMiddleware, 
verifyAdminMiddleware,
usersController.getAllUsers)

// Get one user details by id: admin, user
router.get("/:user_id",
verifyTokenMiddleware, 
verifyUserMiddleware, 
usersController.getOneUserById)


// Get one user details by username: admin
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

// Delete user: admin
router.delete("/:user_id",
verifyTokenMiddleware, 
verifyUserMiddleware, 
verifyAdminMiddleware,
usersController.deleteUser)

// Reset password: admin, user
router.post("/update-password",
verifyTokenMiddleware, 
verifyUserMiddleware, 
usersController.updatePassword)

// Forget password: admin, user
router.post("/reset-password/request",
usersController.resetPasswordRequest)

// Reset password: admin, user
router.post("/reset-password",
usersController.resetPassword)

// Delete account request: admin, user
router.post("/delete-account/request",
verifyTokenMiddleware, 
verifyUserMiddleware, 
usersController.deleteAccountRequest)

// Delete account: admin, user
router.post("/delete-account",
usersController.deleteAccount)

// verify face id: face rec service 
router.post("/verify-face-signup", 
usersController.verifyFaceIdOnSignup)

// verify sms code on signin: admin, user
router.post("/verify-sms-code-signin", 
usersController.verifySMSCodeOnSingIn)


// chagne phone number request: admin, user
router.post("/change-phone-number/request",
verifyTokenMiddleware, 
verifyUserMiddleware,
usersController.changePhoneNumberRequest)

// chagne phone number: admin, user
router.post("/change-phone-number/",
verifyTokenMiddleware, 
verifyUserMiddleware,
usersController.changePhoneNumber)

// signin: admin, user
router.post("/signin", 
usersController.signin)

// signup: admin, user
router.post("/signup", 
usersController.signup)



module.exports = router