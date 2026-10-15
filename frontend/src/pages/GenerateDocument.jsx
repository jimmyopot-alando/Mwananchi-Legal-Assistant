// frontend/src/pages/GenerateDocument.jsx

import React from "react";
import DocumentGenerator from "../components/DocumentGenerator";
import "../styles/main.css";

function GenerateDocument() {
  return (
    <div className="generatedocument-container">
      <h1>Generate a Legal Document</h1>
      <p>
        Provide the details of your case or request, and our assistant will help
        draft a legal document tailored to your needs.
      </p>

      <section className="generatedocument-section">
        <DocumentGenerator />
      </section>
    </div>
  );
}

export default GenerateDocument;
