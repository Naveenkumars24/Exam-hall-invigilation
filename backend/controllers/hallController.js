import Hall from "../models/Hall.js";

export const getHalls = async (req, res) => {
  const halls = await Hall.find();
  res.json(halls);
};

export const getHallById = async (req, res) => {
  const hall = await Hall.findById(req.params.id);
  res.json(hall);
};

export const createHall = async (req, res) => {
  try {
    const { name, location, capacity, invigilator, exam, time } = req.body;

    // Validate required fields
    if (!name || !location || !capacity || !invigilator || !exam || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if a hall with the same name already exists (optional)
    const existingHall = await Hall.findOne({ name });
    if (existingHall) {
      return res.status(400).json({ message: "Hall with this name already exists" });
    }

    // Create a new hall
    const hall = new Hall({
      name,
      location,
      capacity,
      invigilator,
      exam,
      time,
    });

    // Save to DB
    await hall.save();

    res.status(201).json({
      message: "✅ Hall created successfully",
      hall,
    });
  } catch (error) {
    console.error("Error creating hall:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
