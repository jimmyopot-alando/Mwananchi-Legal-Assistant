import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Example schema
const RightSchema = new mongoose.Schema({
  title: String,
  description: String,
});
const Right = mongoose.model("Right", RightSchema);

// GET: list rights
router.get("/", async (req, res) => {
  const rights = await Right.find();
  res.json(rights);
});

export default router;
