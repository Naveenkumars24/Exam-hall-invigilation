import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  id: Number,
  status: { type: String, default: "absent" },
  authenticated: { type: Boolean, default: false },
  malpractice: { type: Boolean, default: false },
  hallId: { type: mongoose.Schema.Types.ObjectId, ref: "Hall" },
});

export default mongoose.model("Student", studentSchema);
