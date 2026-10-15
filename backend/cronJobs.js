// backend/cronJobs.js

import cron from "node-cron";
import Right from "./src/models/Right.js";
import { fetchKenyaLawRecent, fetchAttorneyGeneralRights } from "./src/utils/apiFetcher.js";

/**
 * Weekly job: fetch rights from external sources and update MongoDB
 * Runs every Monday at 2 AM (server time).
 */
cron.schedule("0 2 * * MON", async () => {
  console.log("⏰ Cron job started: Updating rights from external sources...");

  try {
    const kenyaLawRights = await fetchKenyaLawRecent();
    const agRights = await fetchAttorneyGeneralRights();
    const allRights = [...kenyaLawRights, ...agRights];

    for (const right of allRights) {
      await Right.updateOne(
        { title: right.title },
        { $set: right },
        { upsert: true }
      );
    }

    console.log(`✅ Cron job completed: ${allRights.length} rights updated`);
  } catch (err) {
    console.error("❌ Cron job failed:", err.message);
  }
});
