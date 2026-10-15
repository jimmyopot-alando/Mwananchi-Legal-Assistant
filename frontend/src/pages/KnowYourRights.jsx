// frontend/src/pages/KnowYourRights.jsx

import React from "react";
import RightsLibrary from "../components/RightsLibrary";
import "../styles/main.css";

function KnowYourRights() {
  return (
    <div className="knowyourrights-container">
      <h1>Know Your Rights</h1>
      <p>
        Explore the library of legal rights available to citizens. Use the search
        tool to quickly find information relevant to your situation.
      </p>

      <section className="knowyourrights-section">
        <RightsLibrary />
      </section>
    </div>
  );
}

export default KnowYourRights;
