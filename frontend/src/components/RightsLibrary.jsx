// frontend/src/components/RightsLibrary.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // add navigation
import apiClient from "../utils/apiClient";
import "../styles/main.css";

function RightsLibrary() {
  const [rights, setRights] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredRights, setFilteredRights] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRights = async () => {
      try {
        const response = await apiClient.get("/rights");
        setRights(response.data || []);
        setFilteredRights(response.data || []);
      } catch (err) {
        setRights([]);
        setFilteredRights([]);
      }
    };
    fetchRights();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilteredRights(
      rights.filter(
        (right) =>
          right.title.toLowerCase().includes(query) ||
          right.description.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="rightslibrary-container">
      <h2>Know Your Rights</h2>
      <input
        type="text"
        placeholder="Search rights..."
        value={search}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="rights-list">
        {filteredRights.length > 0 ? (
          filteredRights.map((right) => (
            <div
              key={right._id} // use MongoDB _id
              className="right-item clickable"
              onClick={() => navigate(`/rights/${right._id}`)} // navigate to detail page
            >
              <h3>{right.title}</h3>
              <p>{right.description}</p>
              <button className="explore-btn">Explore</button>
            </div>
          ))
        ) : (
          <p>No rights found.</p>
        )}
      </div>
    </div>
  );
}

export default RightsLibrary;
