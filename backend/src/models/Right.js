// backend/src/models/Right.js
import mongoose from "mongoose";

const rightSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String, // detailed text for the detail page
      required: false,
    },
    source: {
      type: String, // e.g., "Kenya Law", "Attorney General"
      default: "Mwananchi Legal Assistant",
    },
    publishedAt: {
      type: Date, // when the law/notice was published
      default: Date.now,
    },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
const Right = mongoose.models.Right || mongoose.model("Right", rightSchema);

export default Right;

