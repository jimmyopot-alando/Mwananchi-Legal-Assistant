// backend/src/utils/apiFetcher.js

import axios from "axios";

/**
 * Fetch recent legislation from Kenya Law
 * Replace the URL with the actual endpoint or page you want to scrape.
 */
export async function fetchKenyaLawRecent() {
  try {
    const response = await axios.get(
      "https://www.kenyalaw.org/kl/index.php?id=recent_legislation"
    );

    // Transform the response into a normalized format
    // NOTE: Adjust mapping based on the actual structure of response.data
    return response.data.map((item) => ({
      title: item.title || "Untitled",
      description: item.summary || "No description available",
      content: item.fullText || "No content available",
      source: "Kenya Law",
      publishedAt: item.date ? new Date(item.date) : new Date(),
    }));
  } catch (err) {
    console.error("❌ Error fetching Kenya Law data:", err.message);
    return [];
  }
}

/**
 * Fetch citizen rights or policy updates from Attorney General’s site
 * Replace with the actual endpoint or RSS feed.
 */
export async function fetchAttorneyGeneralRights() {
  try {
    const response = await axios.get(
      "https://www.statelaw.go.ke/api/rights" // Example placeholder
    );

    return response.data.map((item) => ({
      title: item.title || "Untitled",
      description: item.summary || "No description available",
      content: item.content || "No content available",
      source: "Attorney General",
      publishedAt: item.date ? new Date(item.date) : new Date(),
    }));
  } catch (err) {
    console.error("❌ Error fetching Attorney General data:", err.message);
    return [];
  }
}
