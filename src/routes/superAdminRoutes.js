import express from "express";
import { loginSuperAdmin } from "../controllers/superAdmincontroller";
import { authenticateToken, authorizeRole } from "../middlewares/authmiddleware";


const router = express.Router();

// Public route
router.post("/login", loginSuperAdmin);

// Protected route example
router.get("/dashboard", authenticateToken, authorizeRole("super_admin"), (req, res) => {
  res.status(200).json({ message: "Super Admin dashboard data" });
});

export default router;
