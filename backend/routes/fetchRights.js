// backend/routes/fetchRights.js

import express from "express";
import Right from "../src/models/Right.js";
import { fetchKenyaLawRecent, fetchAttorneyGeneralRights } from "../src/utils/apiFetcher.js";

const router = express.Router();

/**
 * GET /fetch/update-rights
 * Fetches rights from external sources and updates MongoDB.
 */
router.get("/update-rights", async (req, res) => {
  try {
    // Fetch from external sources
    const kenyaLawRights = await fetchKenyaLawRecent();
    const agRights = await fetchAttorneyGeneralRights();
    const allRights = [...kenyaLawRights, ...agRights];

    // Upsert into MongoDB
    for (const right of allRights) {
      await Right.updateOne(
        { title: right.title },
        { $set: right },
        { upsert: true }
      );
    }

    res.json({
      message: "✅ Rights updated successfully",
      count: allRights.length,
    });
  } catch (err) {
    console.error("❌ Error updating rights:", err.message);
    res.status(500).json({ error: "Failed to update rights", details: err.message });
  }
});

export default router;
