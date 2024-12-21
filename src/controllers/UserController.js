import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendOTP } from "../utils/sendEmail.js";
import { log } from "console";

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
  const { email, password, role } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // If user exists, verify the password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Incorrect password." });
      }

      // Check if the user is already verified
      if (user.isVerified) {
        return res.status(200).json({
          message: "User already verified. Login successful.",
          token: generateToken(user),
          role: user.role,
        });
      }
    } else {
      // If user doesn't exist, create a new user with hashed password
      const hashedPassword = await bcrypt.hash(password, 10);

      user = new User({
        name: email.split("@")[0], // Default name from email
        email,
        password: hashedPassword,
        isVerified: false, // Mark user as not verified
        role: role || "Student", // Default to "Student" if role is not provided
      });
    }

    // Generate OTP and save it with expiry
    const otp = generateOTP();
    console.log("Generated OTP:", otp);
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    await user.save();

    // Send OTP via email
    await sendOTP(email, otp);

    res.status(200).json({ message: "OTP sent successfully to your email." });
  } catch (error) {
    console.error("Error in sending OTP:", error);
    res.status(500).json({ error: error.message });
  }
};
// 2. Verify OTP
export const verifyUserOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if OTP is valid
    if (!user.otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired or invalid." });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Incorrect OTP." });
    }

    // Mark user as verified
    user.isVerified = true;

    // Clear OTP fields after successful verification
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Generate JWT Token
    const token = generateToken(user);

    res.status(200).json({
      message: "User authenticated successfully.",
      token,
      role: user.role,
      isVerified: user.isVerified,
    });
  } catch (error) {
    console.error("Error in verifying OTP:", error);
    res.status(500).json({ error: "Failed to verify OTP: " + error.message });
  }
};
