// mobile/screens/PaymentScreen.js

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";

function PaymentScreen() {
  const [amount, setAmount] = useState("");
  const [feature, setFeature] = useState("Premium Feature");

  const handlePayment = async () => {
    if (!amount.trim()) {
      Alert.alert("Error", "Please enter an amount.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/payment", {
        feature,
        amount,
      });

      if (response.data.success) {
        Alert.alert("Success", `Payment for ${feature} confirmed!`);
      } else {
        Alert.alert("Error", "Payment failed. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to server.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.subtitle}>
        Complete your payment to unlock <Text style={styles.bold}>{feature}</Text>.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter amount (KES)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>

      <View style={styles.methods}>
        <Text style={styles.methodsTitle}>Accepted Payment Methods:</Text>
        <Text>💳 Credit/Debit Card</Text>
        <Text>📱 Mobile Money (M-Pesa, Airtel Money)</Text>
        <Text>🏦 Bank Transfer</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 24, fontWeight: "bold", color: "#004080", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 20 },
  bold: { fontWeight: "bold", color: "#004080" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#004080",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, textAlign: "center", fontWeight: "bold" },
  methods: { marginTop: 10 },
  methodsTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
});

export default PaymentScreen;
