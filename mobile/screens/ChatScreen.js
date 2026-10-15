// mobile/screens/ChatScreen.js

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import axios from "axios";

function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: "1", sender: "system", text: "Welcome! Ask me any legal question." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message: input,
      });

      const assistantMessage = {
        id: Date.now().toString(),
        sender: "assistant",
        text: response.data.reply || "No response received.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now().toString(),
        sender: "assistant",
        text: "Error connecting to server. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.message,
        item.sender === "user" ? styles.userMessage : styles.assistantMessage,
        item.sender === "system" ? styles.systemMessage : null,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your question..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  messageList: { padding: 10 },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#e6f2ff",
    alignSelf: "flex-end",
  },
  assistantMessage: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
  },
  systemMessage: {
    backgroundColor: "#ffe6cc",
    alignSelf: "center",
  },
  messageText: { fontSize: 16 },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#004080",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  sendButtonText: { color: "#fff", fontWeight: "bold" },
});

export default ChatScreen;
