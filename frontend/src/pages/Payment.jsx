// frontend/src/pages/Payment.jsx

import React from "react";
import { useLocation } from "react-router-dom";
import PaymentPrompt from "../components/PaymentPrompt";
import "../styles/main.css";

function Payment() {
  const location = useLocation();
  const feature = location.state?.feature || "Premium Feature";

  return (
    <div className="payment-container">
      <h1>Payment</h1>
      <p>
        Complete your payment to unlock <strong>{feature}</strong>. Once payment
        is confirmed, you’ll be redirected back to continue using the service.
      </p>

      <section className="payment-section">
        <PaymentPrompt featureName={feature} />
      </section>

      <div className="payment-info">
        <h3>Accepted Payment Methods</h3>
        <ul>
          <li>💳 Credit/Debit Card</li>
          <li>📱 Mobile Money (M-Pesa, Airtel Money)</li>
          <li>🏦 Bank Transfer</li>
        </ul>
      </div>
    </div>
  );
}

export default Payment;
