import express from "express";
import axios from "axios";

const router = express.Router();

// GET: find nearest court
router.get("/", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const response = await axios.get("http://localhost:8000/courts", { params: { lat, lng } });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Court finder error", details: err.message });
  }
});

export default router;
