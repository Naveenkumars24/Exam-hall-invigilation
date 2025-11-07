import Hall from "../models/Hall.js";

export const getHalls = async (req, res) => {
  const halls = await Hall.find();
  res.json(halls);
};

export const getHallById = async (req, res) => {
  const hall = await Hall.findById(req.params.id);
  res.json(hall);
};
