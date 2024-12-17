import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// SuperAdmin Login
export const superAdminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, role: "superadmin" });

    if (!user) return res.status(404).json({ message: "SuperAdmin not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
