// frontend/src/pages/Home.jsx

import React from "react";
import ChatBox from "../components/ChatBox";
import VoiceChat from "../components/VoiceChat";
import RightsLibrary from "../components/RightsLibrary";
import CourtFinder from "../components/CourtFinder";
import FeeBreakdown from "../components/FeeBreakdown";
import "../styles/main.css";

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Mwananchi Legal Assistant</h1>
      <p className="home-subtitle">
        Your trusted companion for legal guidance, document drafting, and court
        information. Explore the tools below to get started.
      </p>

      {/* Chat with Assistant */}
      <section className="home-section chat-section">
        <h2>💬 Chat with Assistant</h2>
        <div className="chat-box">
          <p className="chat-message">Hello! How can I assist you today?</p>
          <input type="text" placeholder="Type your message..." />
          <button>Send</button>
        </div>
      </section>

      {/* Voice Interaction */}
      <section className="home-section voice-section">
        <h2>🎤 Voice Interaction</h2>
        <div className="voice-box">
          <button className="voice-button">Tap to Speak</button>
        </div>
      </section>

      {/* Know Your Rights */}
      <section className="home-section rights-section">
        <h2>📚 Know Your Rights</h2>
        <div className="rights-buttons">
          <button>Employment Rights</button>
          <button>Family Law</button>
          <button>Property Law</button>
        </div>
        <p>Learn more about your legal rights and protections.</p>
      </section>

      {/* Find Courts */}
      <section className="home-section courts-section">
        <h2>🏛️ Find Courts</h2>
        <div className="court-search">
          <input type="text" placeholder="Enter your location..." />
          <button>Search</button>
        </div>
        <div className="court-map-placeholder">
          <p>[Map will appear here]</p>
        </div>
      </section>

      {/* Legal Fees */}
      <section className="home-section fees-section">
        <h2>💰 Legal Fees</h2>
        <p>Calculate estimated legal costs and fees.</p>
        <button>View Fee Breakdown</button>
      </section>

      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Mwananchi Legal Assistant</p>
      </footer>
    </div>
  );
}

export default Home;