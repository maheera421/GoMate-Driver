import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function VehicleInfo() {
  const router = useRouter();
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const handleNext = () => {
    if (!vehicleModel || !vehicleColor || !vehicleNumber || !vehicleType) {
      Alert.alert("Missing Fields", "Please fill all vehicle details.");
      return;
    }

    // TODO: send vehicle info to backend
    router.push("/vehicle-documents");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Vehicle Information</Text>
      <Text style={styles.subtitle}>Enter details about your vehicle</Text>

      <Text style={styles.label}>Vehicle Model</Text>
      <TextInput
        style={styles.input}
        value={vehicleModel}
        onChangeText={setVehicleModel}
        placeholder="e.g. Honda Civic 2020"
        placeholderTextColor="#A9A9A9"
      />

      <Text style={styles.label}>Vehicle Color</Text>
      <TextInput
        style={styles.input}
        value={vehicleColor}
        onChangeText={setVehicleColor}
        placeholder="e.g. White"
        placeholderTextColor="#A9A9A9"
      />

      <Text style={styles.label}>Vehicle Registration Number</Text>
      <TextInput
        style={styles.input}
        value={vehicleNumber}
        onChangeText={setVehicleNumber}
        placeholder="e.g. LEB-1234"
        placeholderTextColor="#A9A9A9"
      />

      <Text style={styles.label}>Vehicle Type</Text>
      <TextInput
        style={styles.input}
        value={vehicleType}
        onChangeText={setVehicleType}
        placeholder="e.g. Car, Bike, Van"
        placeholderTextColor="#A9A9A9"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flexGrow: 1,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 20,
    color: "#555",
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  backButton: {
    backgroundColor: "#ccc",
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  backText: {
    fontWeight: "bold",
    color: "#000",
  },
  nextButton: {
    backgroundColor: "#007BFF",
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  nextText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
