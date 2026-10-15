import express from "express";
import axios from "axios";

const router = express.Router();

// POST: send a question to microservice
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await axios.post("http://localhost:8000/chat", { message });
res.json(response.data);


    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Chat microservice error", details: err.message });
  }
});

export default router;
