// frontend/src/pages/AskQuestion.jsx

import React from "react";
import ChatBox from "../components/ChatBox";
import "../styles/main.css";

function AskQuestion() {
  return (
    <div className="askquestion-container">
      <h1>Ask a Legal Question</h1>
      <p>
        Type your question below and our assistant will provide guidance based
        on the available legal resources.
      </p>

      <section className="askquestion-chat">
        <ChatBox />
      </section>
    </div>
  );
}

export default AskQuestion;
