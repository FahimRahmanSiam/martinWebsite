import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },

    parentName: { type: String, required: true, trim: true },
    parentEmail: { type: String, required: true, trim: true, lowercase: true },

    phone: { type: String, required: true, trim: true },

    level: { type: String, required: true, trim: true },

    startDate: { type: Date, required: true },
    dob: { type: Date, required: true },

    zipCode: { type: String, required: true, trim: true },

    // Optional admin notes later if you want
    notes: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
