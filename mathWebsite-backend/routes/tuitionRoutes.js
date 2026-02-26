import express from "express";
import {
  createLedger,
  getAllLedgers,
  recordPayment,
  deletePayment,
} from "../controllers/tuitionController.js";
import { requireAuth } from "../middleware/auth.js";


const router = express.Router();

// create ledger for a student
router.post("/create/:studentId", requireAuth, createLedger);

// control panel list
router.get("/", requireAuth, getAllLedgers);

// record payment (monthly or advance)
router.post("/pay/:studentId", requireAuth, recordPayment);

router.delete("/pay/:studentId/:monthIndex/:paymentId", requireAuth, deletePayment);


export default router;
