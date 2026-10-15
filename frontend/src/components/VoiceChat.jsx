// frontend/src/components/VoiceChat.jsx
import React, { useState } from "react";
import apiClient from "../utils/apiClient";

function VoiceChat() {
  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  let mediaRecorder;
  let audioChunks = [];

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("audio", audioBlob, "voice.wav");

      setLoading(true);
      try {
        const res = await apiClient.post("/voice/transcribe", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const text = res.data.transcription || "Could not transcribe audio.";
        setTranscription(text);

        const chatRes = await apiClient.post("/chat", { query: text });
        setResponse(chatRes.data.answer || "No response available.");
      } catch (err) {
        setResponse("Error: Unable to process voice input.");
      } finally {
        setLoading(false);
      }
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  return (
    <div className="voicechat-container">
      <h2>Voice Chat</h2>
      {!recording ? (
        <button onClick={startRecording}>🎤 Start Speaking</button>
      ) : (
        <button onClick={stopRecording}>⏹ Stop & Send</button>
      )}

      {loading && <p>Processing...</p>}

      {transcription && (
        <div className="voicechat-transcription">
          <strong>You said:</strong> {transcription}
        </div>
      )}

      {response && (
        <div className="voicechat-response">
          <strong>Assistant:</strong> {response}
        </div>
      )}
    </div>
  );
}

export default VoiceChat;
