import express from "express";
import axios from "axios";

const router = express.Router();

// POST: send audio to microservice
router.post("/", async (req, res) => {
  try {
    const { audio } = req.body; // base64 audio
    const response = await axios.post("http://localhost:8000/voice", { audio });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Voice microservice error", details: err.message });
  }
});

export default router;
