import express from "express";
import { superAdminLogin } from "../controllers/UserController.js"
import { authenticate, authorizeSuperAdmin } from "../middlewares/auth.js";

const router = express.Router();

// SuperAdmin Login Route
router.post("/login", superAdminLogin);

// Example Protected Route
router.get(
  "/protected",
  authenticate,
  authorizeSuperAdmin,
  (req, res) => {
    res.status(200).json({ message: "Welcome SuperAdmin!" });
  }
);

export default router;
