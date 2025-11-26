import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { 
  getUsers,
  deleteUser,
  getJobs,
  deleteJob,
  createUser 
} from "../controllers/adminController.js";
import { getAdminStats } from "../controllers/adminAnalyticsController.js";
import { updateUserRole } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", authMiddleware, adminOnly, getUsers);
router.delete("/users/:id", authMiddleware, adminOnly, deleteUser);

router.get("/jobs", authMiddleware, adminOnly, getJobs);
router.delete("/jobs/:id", authMiddleware, adminOnly, deleteJob);

router.get("/stats", authMiddleware, adminOnly, getAdminStats);

router.post("/users", authMiddleware, adminOnly, createUser);
router.put("/users/:id/role", authMiddleware, adminOnly, updateUserRole);

export default router;
