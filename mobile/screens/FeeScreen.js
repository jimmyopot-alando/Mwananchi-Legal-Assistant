// mobile/screens/FeeScreen.js

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import axios from "axios";

function FeeScreen() {
  const [caseType, setCaseType] = useState("");
  const [fees, setFees] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchFees = async () => {
    if (!caseType.trim()) {
      Alert.alert("Error", "Please enter a case type.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/fees", {
        params: { caseType },
      });

      if (response.data.fees && response.data.fees.length > 0) {
        setFees(response.data.fees);
        setTotal(response.data.total || 0);
      } else {
        Alert.alert("No Results", "No fees found for this case type.");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to server.");
    }
  };

  const renderFee = ({ item }) => (
    <View style={styles.feeItem}>
      <Text style={styles.feeName}>{item.name}</Text>
      <Text style={styles.feeAmount}>KES {item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fee Breakdown</Text>
      <Text style={styles.subtitle}>
        Enter your case type to view applicable legal fees.
      </Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter case type..."
          value={caseType}
          onChangeText={setCaseType}
        />
        <TouchableOpacity style={styles.button} onPress={fetchFees}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={fees}
        renderItem={renderFee}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />

      {total > 0 && (
        <Text style={styles.total}>Total Fees: KES {total}</Text>
      )}
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
  feeItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  feeName: { fontSize: 16, color: "#004080", fontWeight: "bold" },
  feeAmount: { fontSize: 16, color: "#333" },
  total: { fontSize: 18, fontWeight: "bold", color: "#004080", marginTop: 15 },
});

export default FeeScreen;
