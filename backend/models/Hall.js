import mongoose from "mongoose";

const hallSchema = new mongoose.Schema({
  name: String,
  location: String,
  capacity: Number,
  invigilator: String,
  exam: String,
  time: String,
});

export default mongoose.model("Hall", hallSchema);
