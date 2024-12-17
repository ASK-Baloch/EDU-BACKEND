import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SuperAdmin } from "../src/models/SuperAdmin.js";

export const loginSuperAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const superAdmin = await SuperAdmin.findOne({ email });

    if (!superAdmin) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, superAdmin.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: superAdmin._id, role: superAdmin.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, role: superAdmin.role });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
