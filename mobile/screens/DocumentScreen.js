// mobile/screens/DocumentScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

function DocumentScreen() {
  const [details, setDetails] = useState("");
  const [generatedDoc, setGeneratedDoc] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!details.trim()) {
      Alert.alert("Error", "Please provide case or request details.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/documents", {
        details,
      });

      if (response.data && response.data.document) {
        setGeneratedDoc(response.data.document);
      } else {
        Alert.alert("Error", "No document generated. Try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Generate a Legal Document</Text>
      <Text style={styles.subtitle}>
        Provide the details of your case or request, and our assistant will draft a legal document tailored to your needs.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter case or request details..."
        multiline
        numberOfLines={6}
        value={details}
        onChangeText={setDetails}
      />

      <TouchableOpacity style={styles.button} onPress={handleGenerate} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Generating..." : "Generate Document"}</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#004080" style={{ marginBottom: 20 }} />}

      {generatedDoc ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Generated Document:</Text>
          <Text style={styles.resultText}>{generatedDoc.content}</Text>

          <Text style={styles.resultTitle}>Document Type:</Text>
          <Text style={styles.resultMeta}>{generatedDoc.type}</Text>

          <Text style={styles.resultTitle}>Summary:</Text>
          <Text style={styles.resultMeta}>{generatedDoc.summary}</Text>

          <Text style={styles.resultTitle}>Keywords:</Text>
          <Text style={styles.resultMeta}>{generatedDoc.keywords.join(", ")}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 24, fontWeight: "bold", color: "#004080", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
    marginBottom: 15,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#004080",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, textAlign: "center", fontWeight: "bold" },
  resultContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 10,
  },
  resultTitle: { fontSize: 18, fontWeight: "bold", marginTop: 10, color: "#004080" },
  resultText: { fontSize: 16, color: "#333", marginBottom: 10 },
  resultMeta: { fontSize: 15, color: "#555", marginBottom: 10 },
});

export default DocumentScreen;
