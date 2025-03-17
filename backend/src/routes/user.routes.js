import { Router } from "express"
import {
    changeCurrentPassword,
    checkAuth,
    forgotPassword, 
    getCurrentUser, 
    loginUser, logoutUser, 
    refreshAccessToken, 
    registerUser, 
    resetPassword, 
    updateAccountDetails, 
    verifyOtp 
} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgot-password").post(forgotPassword)
router.route("/verify-otp").post(verifyOtp)
router.route("/reset-password").post(resetPassword)

//secured routes
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/check-auth").get(checkAuth)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/update-account-details").post(verifyJWT, updateAccountDetails)


export default router