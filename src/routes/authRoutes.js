import express from "express";
import { sendUserOTP, verifyUserOTP } from "../controllers/UserController.js";

const router = express.Router();

// Send OTP Route
router.post("/send-otp", sendUserOTP);

// Verify OTP Route
router.post("/verify-otp", verifyUserOTP);

export default router;
