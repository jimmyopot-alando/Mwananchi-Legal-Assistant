// mobile/App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import screens
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import PaymentScreen from "./screens/PaymentScreen";
import DocumentScreen from "./screens/DocumentScreen";
import CourtScreen from "./screens/CourtScreen";
import FeeScreen from "./screens/FeeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#004080" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerBackTitleVisible: false, // ✅ hides long back labels
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Mwananchi Legal Assistant" }} // ✅ custom title
        />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Document" component={DocumentScreen} />
        <Stack.Screen name="Court" component={CourtScreen} />
        <Stack.Screen name="Fees" component={FeeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
