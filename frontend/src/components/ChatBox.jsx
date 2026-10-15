// frontend/src/components/ChatBox.jsx

import React, { useState } from "react";
import apiClient from "../utils/apiClient";
import "../styles/main.css";

function ChatBox() {
  const [messages, setMessages] = useState([
    { sender: "system", text: "Welcome to Mwananchi Legal Assistant! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Call backend API
      const response = await apiClient.post("/api/chat", { message: input });


      const reply = response.data.reply || "Sorry, I couldn’t process that.";


      setMessages([...newMessages, { sender: "assistant", text: reply }]);
    } catch (err) {
      setMessages([...newMessages, { sender: "assistant", text: "Error: Unable to connect to server." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbox-message ${msg.sender}`}
          >
            <span>{msg.text}</span>
          </div>
        ))}
        {loading && <div className="chatbox-message assistant">Typing...</div>}
      </div>

      <div className="chatbox-input">
        <input
          type="text"
          placeholder="Ask a legal question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
