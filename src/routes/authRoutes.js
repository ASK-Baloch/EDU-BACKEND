import express from "express";
import { sendOTPToUser, verifyUserOTP } from "../controllers/UserController.js";

const router = express.Router();

// Send OTP Route
router.post("/send-otp", sendOTPToUser);

// Verify OTP Route
router.post("/verify-otp", verifyUserOTP);

export default router;
