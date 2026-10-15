// frontend/src/pages/RightsLibrary.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const RightsLibrary = () => {
  const [rights, setRights] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch rights from backend
  const fetchRights = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/rights"); // existing endpoint
      setRights(res.data);
    } catch (err) {
      console.error("❌ Error fetching rights:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Trigger backend update from external sources
  const refreshRights = async () => {
    try {
      setLoading(true);
      await axios.get("/fetch/update-rights"); // new endpoint
      await fetchRights(); // reload rights after update
    } catch (err) {
      console.error("❌ Error refreshing rights:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRights();
  }, []);

  return (
    <div className="rights-library">
      <h1>Rights Library</h1>
      <button onClick={refreshRights} disabled={loading}>
        {loading ? "Updating..." : "Refresh Rights"}
      </button>

      <ul>
        {rights.map((right) => (
          <li key={right._id}>
            <h3>{right.title}</h3>
            <p>{right.description}</p>
            <small>
              Source: {right.source} | Published:{" "}
              {new Date(right.publishedAt).toLocaleDateString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightsLibrary;
