import Student from "../models/Student.js";

export const getStudentsByHall = async (req, res) => {
  const students = await Student.find({ hallId: req.params.hallId });
  res.json(students);
};

export const addStudent = async (req, res) => {
  try {
    const { name, rollNo, id, status, authenticated, malpractice, hallId } = req.body;

    // Optional basic validation
    if (!name || !rollNo || !id || !hallId) {
      return res.status(400).json({ message: "Please provide name, rollNo, id, and hallId" });
    }

    // Check if student already exists (by rollNo or id)
    const existingStudent = await Student.findOne({ rollNo });
    if (existingStudent) {
      return res.status(400).json({ message: "Student with this roll number already exists" });
    }

    // Create new student
    const newStudent = new Student({
      name,
      rollNo,
      id,
      status: status || "absent",
      authenticated: authenticated || false,
      malpractice: malpractice || false,
      hallId,
    });

    // Save to DB
    await newStudent.save();

    res.status(201).json({
      message: "✅ Student added successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;  // This will be the student's MongoDB _id
    const updates = req.body;   // The fields to update dynamically

    // Validate input
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No update data provided" });
    }

    // Find and update student
    const student = await Student.findByIdAndUpdate(id, updates, { new: true });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "✅ Student updated successfully",
      student,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: error.message });
  }
};


export const updateStudentStatus = async (req, res) => {
  try{
  console.log(req.params);
  const { id } = req.params;
  console.log(id);
  const student = await Student.findOneAndUpdate(
  { id: id },
  { authenticated: true },
  { new: true }
);

  if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Authentication status updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

export const toggleStudentField = async (req, res) => {
  try {
    console.log(1);
    const { id } = req.params;         // MongoDB _id
    const update = req.body;           // { authenticated: true } or { malpractice: false }

    // Validate that at least one field is present
    if (!update || Object.keys(update).length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const student = await Student.findByIdAndUpdate(id, update, { new: true });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: error.message });
  }
};

