// frontend/src/components/DocumentGenerator.jsx

import React, { useState } from "react";
import apiClient from "../utils/apiClient";
import PaymentPrompt from "./PaymentPrompt";
import "../styles/main.css";

function DocumentGenerator() {
  const [input, setInput] = useState("");
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    // Check if premium feature requires payment
    setShowPayment(true);
  };

  const proceedWithGeneration = async () => {
    setLoading(true);
    setShowPayment(false);

    try {
      const response = await apiClient.post("/reason", {
        text: input,
        task: "draft",
      });

      setDocument(response.data.result.content);
    } catch (err) {
      setDocument("Error: Unable to generate document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="documentgen-container">
      <h2>Document Generator</h2>
      <textarea
        placeholder="Enter details for your legal document..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={6}
      />

      <button className="btn-primary" onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Document"}
      </button>

      {showPayment && (
        <PaymentPrompt
          featureName="Document Generator"
          onProceed={proceedWithGeneration}
          onCancel={() => setShowPayment(false)}
        />
      )}

      {document && (
        <div className="documentgen-output">
          <h3>Generated Document</h3>
          <pre>{document}</pre>
        </div>
      )}
    </div>
  );
}

export default DocumentGenerator;
