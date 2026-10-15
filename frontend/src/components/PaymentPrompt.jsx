// frontend/src/components/PaymentPrompt.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";

function PaymentPrompt({ featureName }) {
  const [showPrompt, setShowPrompt] = useState(true);
  const navigate = useNavigate();

  const handleProceed = () => {
    // Redirect to payment page
    navigate("/payment", { state: { feature: featureName } });
  };

  const handleCancel = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="paymentprompt-container">
      <div className="paymentprompt-box">
        <h2>Premium Feature</h2>
        <p>
          The feature <strong>{featureName}</strong> requires a payment to
          unlock. Please proceed to complete your payment.
        </p>

        <div className="paymentprompt-actions">
          <button className="btn-primary" onClick={handleProceed}>
            Proceed to Payment
          </button>
          <button className="btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPrompt;
