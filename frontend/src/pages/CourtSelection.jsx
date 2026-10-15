// frontend/src/pages/CourtSelection.jsx

import React from "react";
import CourtFinder from "../components/CourtFinder";
import "../styles/main.css";

function CourtSelection() {
  return (
    <div className="courtselection-container">
      <h1>Select a Court</h1>
      <p>
        Search for courts by name or location, and select the one that best fits
        your case. This will help guide you to the right jurisdiction.
      </p>

      <section className="courtselection-section">
        <CourtFinder />
      </section>
    </div>
  );
}

export default CourtSelection;
