import TuitionLedger from "../models/TuitionLedger.js";
import Student from "../models/Student.js";
import { getMonthlyTuitionByLevel } from "../utils/tuition.js";

/**
 * Create ledger for a student (5 months)
 * POST /api/tuition/create/:studentId
 */

function recomputeMonthStatus(month) {
  // keep it stable
  const paid = Number(month.amountPaid || 0);
  const due = Number(month.amountDue || 0);

  if (paid <= 0) return "unpaid";
  if (paid + 0.000001 >= due) return "paid";
  return "partial";
}

export async function deletePayment(req, res) {
  try {
    const { studentId, monthIndex, paymentId } = req.params;

    const ledger = await TuitionLedger.findOne({ studentId });
    if (!ledger) return res.status(404).json({ message: "Ledger not found" });

    const mIndex = Number(monthIndex);
    const month = ledger.months.find((m) => m.monthIndex === mIndex);
    if (!month) return res.status(404).json({ message: "Month not found" });

    const payIdx = month.payments.findIndex((p) => p.paymentId === paymentId);
    if (payIdx === -1) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const removed = month.payments[payIdx];
    const removedAmount = Number(removed.amount || 0);

    // Remove payment
    month.payments.splice(payIdx, 1);

    // Subtract amount, never go below 0
    month.amountPaid = Math.max(0, Number(month.amountPaid || 0) - removedAmount);

    // Recompute status
    month.status = recomputeMonthStatus(month);

    await ledger.save();
    return res.json({ message: "Payment deleted ✅", ledger });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function createLedger(req, res) {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const exists = await TuitionLedger.findOne({ studentId });
    if (exists) return res.status(400).json({ message: "Ledger already exists" });

    const monthlyTuition = getMonthlyTuitionByLevel(student.level);
    if (!monthlyTuition) return res.status(400).json({ message: "Invalid level" });

    const startDate = student.startDate || new Date();

    const months = Array.from({ length: 5 }).map((_, i) => {
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + i);

      return {
        monthIndex: i + 1,
        dueDate,
        amountDue: monthlyTuition,
        amountPaid: 0,
        status: "unpaid",
        payments: [],
      };
    });

    const ledger = await TuitionLedger.create({
      studentId,
      courseMonths: 5,
      courseStartDate: startDate,
      monthlyTuition,
      months,
    });

    return res.status(201).json(ledger);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

/**
 * Control panel view
 * GET /api/tuition
 */
export async function getAllLedgers(req, res) {
  try {
    const ledgers = await TuitionLedger.find()
      .populate("studentId", "firstName lastName level parentName parentEmail phone")
      .sort({ createdAt: -1 });

    return res.json(ledgers);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

/**
 * Record a payment (monthly or advance)
 * POST /api/tuition/pay/:studentId
 */
export async function recordPayment(req, res) {
  try {
    const { studentId } = req.params;
    const { monthIndexes, amount, method, note, reference } = req.body;

    if (!Array.isArray(monthIndexes) || monthIndexes.length === 0) {
      return res.status(400).json({ message: "monthIndexes required" });
    }

    if (!amount || !method) {
      return res.status(400).json({ message: "amount and method required" });
    }

    const ledger = await TuitionLedger.findOne({ studentId });
    if (!ledger) return res.status(404).json({ message: "Ledger not found" });

    const perMonthAmount = amount / monthIndexes.length;

    monthIndexes.forEach((index) => {
      const month = ledger.months.find((m) => m.monthIndex === index);
      if (!month) return;

      month.amountPaid += perMonthAmount;
      month.payments.push({
        amount: perMonthAmount,
        method,
        note,
        reference,
      });

      if (month.amountPaid >= month.amountDue) {
        month.status = "paid";
      } else if (month.amountPaid > 0) {
        month.status = "partial";
      }
    });

    await ledger.save();
    return res.json(ledger);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
