// frontend/src/components/FeeBreakdown.jsx

import React, { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";
import "../styles/main.css";

function FeeBreakdown() {
  const [fees, setFees] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredFees, setFilteredFees] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await apiClient.get("/fees");
        setFees(response.data || []);
        setFilteredFees(response.data || []);
      } catch (err) {
        setFees([]);
        setFilteredFees([]);
      }
    };
    fetchFees();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilteredFees(
      fees.filter(
        (fee) =>
          fee.name.toLowerCase().includes(query) ||
          fee.category.toLowerCase().includes(query)
      )
    );
  };

  const handleSelectFee = (amount) => {
    setTotal((prev) => prev + amount);
  };

  return (
    <div className="feebreakdown-container">
      <h2>Legal Fee Breakdown</h2>
      <input
        type="text"
        placeholder="Search fees by name or category..."
        value={search}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="fees-list">
        {filteredFees.length > 0 ? (
          filteredFees.map((fee, index) => (
            <div key={index} className="fee-item">
              <h3>{fee.name}</h3>
              <p><strong>Category:</strong> {fee.category}</p>
              <p><strong>Amount:</strong> KES {fee.amount}</p>
              <button
                className="btn-primary"
                onClick={() => handleSelectFee(fee.amount)}
              >
                Add to Total
              </button>
            </div>
          ))
        ) : (
          <p>No fees found.</p>
        )}
      </div>

      <div className="fee-total">
        <h3>Total Selected Fees: KES {total}</h3>
      </div>
    </div>
  );
}

export default FeeBreakdown;
