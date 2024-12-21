import express from "express";
import {
  getAllSchools,
  registerSchool,
  updateSchoolStatus,
  getActiveSchools,
  getInactiveSchools,
} from "../controllers/SchoolController.js";
import { authorizeSuperAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authorizeSuperAdmin, getAllSchools);
router.post("/", authorizeSuperAdmin, registerSchool);
router.put("/:id/status", authorizeSuperAdmin, updateSchoolStatus);
router.get("/active", authorizeSuperAdmin, getActiveSchools);
router.get("/inactive", authorizeSuperAdmin, getInactiveSchools);

export default router;
