import Student from "../models/Student.js";
import TuitionLedger from "../models/TuitionLedger.js";
import { getMonthlyTuitionByLevel } from "../utils/tuition.js";

// CREATE STUDENT + AUTO CREATE LEDGER (WITH MONTHS)
export async function createStudent(req, res) {
  try {
    const {
      firstName,
      lastName,
      parentName,
      parentEmail,
      phone,
      level,
      startDate,
      dob,
      zipCode,
    } = req.body;

    // Required fields check
    if (
      !firstName ||
      !lastName ||
      !parentName ||
      !parentEmail ||
      !phone ||
      !level ||
      !startDate
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 1) Create the student
    const student = await Student.create({
      firstName,
      lastName,
      parentName,
      parentEmail,
      phone,
      level,
      startDate: new Date(startDate),
      dob: dob ? new Date(dob) : undefined,
      zipCode,
    });

    // 2) Calculate tuition
    const monthlyTuition = getMonthlyTuitionByLevel(level);
    if (!monthlyTuition) {
      // rollback student if level invalid
      await Student.findByIdAndDelete(student._id);
      return res.status(400).json({ message: "Invalid course level" });
    }

    // 3) Build 5 months
    const courseStartDate = new Date(startDate);
    if (isNaN(courseStartDate.getTime())) {
      await Student.findByIdAndDelete(student._id);
      return res.status(400).json({ message: "Invalid startDate" });
    }

    const months = Array.from({ length: 5 }).map((_, idx) => {
      const dueDate = new Date(courseStartDate);
      dueDate.setMonth(dueDate.getMonth() + idx);

      return {
        monthIndex: idx + 1,
        dueDate,
        amountDue: monthlyTuition,
        amountPaid: 0,
        status: "unpaid",
        payments: [],
      };
    });

    // 4) Create ledger WITH months
    await TuitionLedger.create({
      studentId: student._id,
      courseMonths: 5,
      courseStartDate,
      monthlyTuition,
      months,
    });

    return res.status(201).json(student);
  } catch (err) {
    console.error("createStudent error:", err);
    return res.status(500).json({ message: err.message });
  }
}

// GET ALL STUDENTS
export async function getStudents(req, res) {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return res.json(students);
  } catch (err) {
    console.error("getStudents error:", err);
    return res.status(500).json({ message: err.message });
  }
}

// UPDATE STUDENT
export async function updateStudent(req, res) {
  try {
    const { id } = req.params;

    const updated = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Student not found" });

    return res.json(updated);
  } catch (err) {
    console.error("updateStudent error:", err);
    return res.status(500).json({ message: err.message });
  }
}

// DELETE STUDENT + DELETE LEDGER
export async function deleteStudent(req, res) {
  try {
    const { id } = req.params;

    await TuitionLedger.findOneAndDelete({ studentId: id });
    await Student.findByIdAndDelete(id);

    return res.json({ message: "Student and ledger deleted ✅" });
  } catch (err) {
    console.error("deleteStudent error:", err);
    return res.status(500).json({ message: err.message });
  }
}
