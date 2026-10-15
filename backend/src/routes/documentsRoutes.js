// backend/src/routes/documentsRoutes.js

import express from "express";
import { spawn } from "child_process";

const router = express.Router();

/**
 * POST /api/documents
 * Accepts case/request details and returns a drafted legal document
 * using the Python document_ai microservice.
 */
router.post("/", async (req, res) => {
  const { details } = req.body;

  if (!details || !details.trim()) {
    return res.status(400).json({ error: "Details are required." });
  }

  try {
    // Spawn Python process to run document_ai
    const python = spawn("python3", [
      "ai-services/reasoning/run_document_ai.py", // helper runner script
      details,
    ]);

    let output = "";
    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      console.error("❌ Python error:", data.toString());
    });

    python.on("close", () => {
      try {
        const result = JSON.parse(output);
        res.json({ document: result });
      } catch (err) {
        console.error("❌ Failed to parse Python output:", err.message);
        res.status(500).json({ error: "Document generation failed." });
      }
    });
  } catch (err) {
    console.error("❌ Error running document AI:", err.message);
    res.status(500).json({ error: "Server error." });
  }
});

export default router;
