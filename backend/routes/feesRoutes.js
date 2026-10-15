import express from "express";
import axios from "axios";

const router = express.Router();

// POST: calculate fees
router.post("/", async (req, res) => {
  try {
    const { caseType, amount } = req.body;
    const response = await axios.post("http://localhost:8000/fees", { caseType, amount });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Fee calculator error", details: err.message });
  }
});

export default router;
