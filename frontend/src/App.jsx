// frontend/src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import AskQuestion from "./pages/AskQuestion";
import GenerateDocument from "./pages/GenerateDocument";
import KnowYourRights from "./pages/KnowYourRights";
import Payment from "./pages/Payment";
import CourtSelection from "./pages/CourtSelection";

// Styles
import "./styles/main.css";
import "./styles/responsive.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Global header */}
        <header className="app-header">
          <h1>Mwananchi Legal Assistant</h1>
        </header>

        {/* Main content */}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ask" element={<AskQuestion />} />
            <Route path="/document" element={<GenerateDocument />} />
            <Route path="/rights" element={<KnowYourRights />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/courts" element={<CourtSelection />} />
          </Routes>
        </main>

        {/* Global footer */}
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} Mwananchi Legal Assistant</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
