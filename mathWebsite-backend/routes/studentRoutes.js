import express from "express";
import {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Public: enrollment submit
router.post("/", createStudent);

// Admin only: list, update, delete
router.get("/", requireAuth, getStudents);
router.put("/:id", requireAuth, updateStudent);
router.delete("/:id", requireAuth, deleteStudent);

export default router;
