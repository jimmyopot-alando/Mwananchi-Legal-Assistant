// mobile/screens/CourtScreen.js

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import axios from "axios";

function CourtScreen() {
  const [query, setQuery] = useState("");
  const [courts, setCourts] = useState([]);

  const searchCourts = async () => {
    if (!query.trim()) {
      Alert.alert("Error", "Please enter a court name or location.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/courts", {
        params: { search: query },
      });

      if (response.data.courts && response.data.courts.length > 0) {
        setCourts(response.data.courts);
      } else {
        Alert.alert("No Results", "No courts found for your search.");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to server.");
    }
  };

  const renderCourt = ({ item }) => (
    <View style={styles.courtItem}>
      <Text style={styles.courtName}>{item.name}</Text>
      <Text style={styles.courtLocation}>{item.location}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Courts</Text>
      <Text style={styles.subtitle}>
        Search for courts by name or location to find the right jurisdiction for your case.
      </Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter court name or location..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.button} onPress={searchCourts}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={courts}
        renderItem={renderCourt}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 24, fontWeight: "bold", color: "#004080", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 20 },
  searchContainer: { flexDirection: "row", marginBottom: 15 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  button: {
    backgroundColor: "#004080",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  list: { marginTop: 10 },
  courtItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  courtName: { fontSize: 18, fontWeight: "bold", color: "#004080" },
  courtLocation: { fontSize: 16, color: "#555" },
});

export default CourtScreen;
