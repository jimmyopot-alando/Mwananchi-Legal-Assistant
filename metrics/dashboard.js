// metrics/dashboard.js

import express from "express";
import path from "path";
import fs from "fs";

const app = express();
const PORT = process.env.METRICS_PORT || 4000;

// Serve static files (for charts and frontend assets)
app.use(express.static(path.join(process.cwd(), "metrics")));

// Endpoint: Dashboard HTML
app.get("/", (req, res) => {
  const analyticsPath = path.join(process.cwd(), "metrics", "analytics.json");
  let analyticsData = {};

  try {
    const rawData = fs.readFileSync(analyticsPath);
    analyticsData = JSON.parse(rawData);
  } catch (error) {
    console.error("❌ Failed to load analytics.json:", error);
    analyticsData = { requests: [], errors: [], usage: [] };
  }

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Metrics Dashboard</title>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f9f9f9; }
        h1 { color: #004080; }
        canvas { margin: 20px 0; max-width: 800px; }
      </style>
    </head>
    <body>
      <h1>📊 Metrics Dashboard</h1>
      <p>Visualizing system performance and usage trends.</p>

      <h2>Requests Over Time</h2>
      <canvas id="requestsChart"></canvas>

      <h2>Error Rates</h2>
      <canvas id="errorsChart"></canvas>

      <h2>Feature Usage</h2>
      <canvas id="usageChart"></canvas>

      <script>
        const analytics = ${JSON.stringify(analyticsData)};

        // Requests Chart
        new Chart(document.getElementById("requestsChart"), {
          type: "line",
          data: {
            labels: analytics.requests.map(r => r.date),
            datasets: [{
              label: "Requests",
              data: analytics.requests.map(r => r.count),
              borderColor: "#004080",
              fill: false
            }]
          }
        });

        // Errors Chart
        new Chart(document.getElementById("errorsChart"), {
          type: "bar",
          data: {
            labels: analytics.errors.map(e => e.date),
            datasets: [{
              label: "Errors",
              data: analytics.errors.map(e => e.count),
              backgroundColor: "#ff4d4d"
            }]
          }
        });

        // Usage Chart
        new Chart(document.getElementById("usageChart"), {
          type: "pie",
          data: {
            labels: analytics.usage.map(u => u.feature),
            datasets: [{
              label: "Feature Usage",
              data: analytics.usage.map(u => u.count),
              backgroundColor: ["#004080", "#ff9900", "#33cc33", "#cc33ff"]
            }]
          }
        });
      </script>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`📊 Metrics dashboard running at http://localhost:${PORT}`);
});
