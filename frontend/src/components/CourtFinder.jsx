// frontend/src/components/CourtFinder.jsx

import React, { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";
import "../styles/main.css";

function CourtFinder() {
  const [courts, setCourts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCourts, setFilteredCourts] = useState([]);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await apiClient.get("/courts");
        setCourts(response.data || []);
        setFilteredCourts(response.data || []);
      } catch (err) {
        setCourts([]);
        setFilteredCourts([]);
      }
    };
    fetchCourts();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilteredCourts(
      courts.filter(
        (court) =>
          court.name.toLowerCase().includes(query) ||
          court.location.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="courtfinder-container">
      <h2>Find a Court</h2>
      <input
        type="text"
        placeholder="Search courts by name or location..."
        value={search}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="courts-list">
        {filteredCourts.length > 0 ? (
          filteredCourts.map((court, index) => (
            <div key={index} className="court-item">
              <h3>{court.name}</h3>
              <p><strong>Location:</strong> {court.location}</p>
              <p><strong>Jurisdiction:</strong> {court.jurisdiction}</p>
            </div>
          ))
        ) : (
          <p>No courts found.</p>
        )}
      </div>
    </div>
  );
}

export default CourtFinder;
