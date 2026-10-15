// backend/src/routes/fetchRights.js

const express = require("express");
const axios = require("axios");
const Right = require("../models/Right");

const router = express.Router();

/**
 * GET /fetch/update-rights
 * Fetches legal content from trusted external sources (Kenya Law, AG’s site)
 * and updates the MongoDB rights collection.
 */
router.get("/update-rights", async (req, res) => {
  try {
    // Example: Fetch recent legislation from Kenya Law (replace with actual API/URL)
    const response = await axios.get(
      "https://www.kenyalaw.org/kl/index.php?id=recent_legislation"
    );

    // Transform response into your schema
    // NOTE: Adjust mapping based on the actual structure of response.data
    const rights = response.data.map((item) => ({
      title: item.title || "Untitled",
      description: item.summary || "No description available",
      content: item.fullText || "No content available",
      source: "Kenya Law",
      publishedAt: item.date ? new Date(item.date) : new Date(),
    }));

    // Insert or update MongoDB
    // Using upsert logic: if a right with same title exists, update it
    for (const right of rights) {
      await Right.updateOne(
        { title: right.title },
        { $set: right },
        { upsert: true }
      );
    }

    res.json({
      message: "✅ Rights updated from Kenya Law",
      count: rights.length,
    });
  } catch (err) {
    console.error("❌ Error fetching rights:", err.message);
    res.status(500).json({
      error: "Failed to fetch rights",
      details: err.message,
    });
  }
});

module.exports = router;
