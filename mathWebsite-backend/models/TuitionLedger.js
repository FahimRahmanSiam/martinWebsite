import mongoose from "mongoose";
import crypto from "crypto";

const paymentSchema = new mongoose.Schema(
  {
    paymentId: {
        type: String,
        default: () => crypto.randomUUID(),
        index: true,
      },
    amount: { type: Number, required: true },
    method: { type: String, enum: ["zelle", "cash"], required: true },
    paidAt: { type: Date, default: Date.now },

    // optional but very useful
    reference: { type: String, default: "" }, // zelle confirmation / receipt note
    note: { type: String, default: "" },
  },
  { _id: false }
);

const monthSchema = new mongoose.Schema(
  {
    monthIndex: { type: Number, required: true }, // 1..5
    dueDate: { type: Date, required: true },

    amountDue: { type: Number, required: true },
    amountPaid: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["unpaid", "partial", "paid"],
      default: "unpaid",
    },

    payments: { type: [paymentSchema], default: [] },
  },
  { _id: false }
);

const tuitionLedgerSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      unique: true, // one ledger per student
    },

    // course config
    courseMonths: { type: Number, default: 5 },
    courseStartDate: { type: Date, required: true },
    monthlyTuition: { type: Number, required: true },

    months: { type: [monthSchema], default: [] },

    // optional admin info
    active: { type: Boolean, default: true },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("TuitionLedger", tuitionLedgerSchema);
