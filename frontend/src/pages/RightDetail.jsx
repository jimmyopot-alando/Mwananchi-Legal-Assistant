// frontend/src/pages/RightDetail.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // add useNavigate
import apiClient from "../utils/apiClient";
import "../styles/main.css";

function RightDetail() {
  const { id } = useParams();
  const [right, setRight] = useState(null);
  const navigate = useNavigate(); // hook for navigation

  useEffect(() => {
    const fetchRight = async () => {
      try {
        const response = await apiClient.get(`/rights/${id}`);
        setRight(response.data);
      } catch (err) {
        setRight(null);
      }
    };
    fetchRight();
  }, [id]);

  if (!right) return <p>Loading...</p>;

  return (
    <div className="rightdetail-container">
      <h1>{right.title}</h1>
      <p className="right-description">{right.description}</p>
      <section className="right-content">
        <p>{right.content}</p>
      </section>

      {/* Back to Home button */}
      <button className="btn-primary" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
    </div>
  );
}

export default RightDetail;
