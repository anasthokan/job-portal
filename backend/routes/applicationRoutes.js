import express from "express";
import {
  applyJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus
} from "../controllers/applicationController.js";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Jobseeker apply job
router.post(
  "/:id/apply",
  authMiddleware,
  authorizeRoles("jobseeker"),
  applyJob
);

// Jobseeker - my applications
router.get(
  "/my",
  authMiddleware,
  authorizeRoles("jobseeker"),
  getMyApplications
);

// Employer - get applicants for job
router.get(
  "/job/:jobId",
  authMiddleware,
  authorizeRoles("employer"),
  getApplicantsForJob
);

// Employer - update status
router.put(
  "/:applicationId",
  authMiddleware,
  authorizeRoles("employer"),
  updateApplicationStatus
);

// Jobseeker check status
router.get(
  "/check/:jobId",
  authMiddleware,
  authorizeRoles("jobseeker"),
  getMyApplications
);

export default router;
