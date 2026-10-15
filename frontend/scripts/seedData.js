// scripts/seedData.js

import mongoose from "mongoose";
import dotenv from "dotenv";

// Import models
import Right from "../backend/models/Right.js";
import Court from "../backend/models/Court.js";
import Fee from "../backend/models/Fee.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Right.deleteMany();
    await Court.deleteMany();
    await Fee.deleteMany();

    console.log("🧹 Cleared existing collections");

    // Seed Rights
    const rights = [
      { title: "Right to Fair Trial", description: "Every person has the right to a fair and public hearing before an independent court." },
      { title: "Freedom of Expression", description: "Citizens have the right to express opinions freely within the law." },
      { title: "Right to Privacy", description: "Individuals are entitled to privacy of communication and personal data." },
    ];
    await Right.insertMany(rights);
    console.log("📚 Seeded Rights");

    // Seed Courts
    const courts = [
      { name: "Mombasa High Court", location: "Mombasa County" },
      { name: "Nairobi Magistrates Court", location: "Nairobi County" },
      { name: "Kisumu Law Courts", location: "Kisumu County" },
    ];
    await Court.insertMany(courts);
    console.log("🏛️ Seeded Courts");

    // Seed Fees
    const fees = [
      { name: "Filing Fee", amount: 2000 },
      { name: "Service Fee", amount: 1500 },
      { name: "Hearing Fee", amount: 3000 },
    ];
    await Fee.insertMany(fees);
    console.log("💰 Seeded Fees");

    console.log("🌱 Seeding complete!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
