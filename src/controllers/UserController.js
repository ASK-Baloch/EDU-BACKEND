import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendOTP } from "../utils/sendEmail.js";

// Generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// 1. Send OTP for Login/Signup
export const sendUserOTP = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    let user = await User.findOne({ email });

    // If user doesn't exist, create a new one
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({
        name: email.split("@")[0], // Default name from email
        email,
        password: hashedPassword,
      });
    } else {
      // Verify password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Incorrect password" });
      }
    }

    // Generate OTP and save it with expiry
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    await user.save();

    // Send OTP via email
    await sendOTP(email, otp);

    res.status(200).json({ message: "OTP sent successfully to your email." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Verify OTP
export const verifyUserOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired or invalid." });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Incorrect OTP" });
    }

    // Clear OTP fields after successful verification
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Generate JWT Token
    const token = generateToken(user);

    res.status(200).json({
      message: "User authenticated successfully",
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to verify OTP:" + error.message });
  }
};
