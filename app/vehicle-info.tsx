import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const vehicleTypes = [
  { label: "Car", icon: "directions-car" },
  { label: "Bike", icon: "two-wheeler" },
  { label: "Rickshaw", icon: "pedal-bike" },
];

export default function VehicleInfo() {
  const router = useRouter();
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehiclePhotos, setVehiclePhotos] = useState<string[]>([]);

  const handleNext = () => {
    if (!vehicleType || !vehicleModel || !vehicleColor || vehicleNumber.length !== 8 || vehiclePhotos.length < 1) {
      Alert.alert("Incomplete Details", "Please fill all fields and upload at least one photo.");
      return;
    }
    // TODO: send to backend
    router.push("/vehicle-documents");
  };

  const handlePhotoChoice = () => {
    if (vehiclePhotos.length >= 5) {
      Alert.alert("Limit Reached", "You can upload up to 5 photos only.");
      return;
    }

    Alert.alert("Upload Vehicle Photo", "Choose an option", [
      {
        text: "Take Photo",
        onPress: async () => {
          const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
          if (!cameraPermission.granted) {
            Alert.alert("Permission required", "Camera access is needed.");
            return;
          }

          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.7,
          });

          if (!result.canceled) {
            setVehiclePhotos([...vehiclePhotos, result.assets[0].uri]);
          }
        },
      },
      {
        text: "Choose from Gallery",
        onPress: async () => {
          const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (!galleryPermission.granted) {
            Alert.alert("Permission required", "Gallery access is needed.");
            return;
          }

          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
          });

          if (!result.canceled) {
            setVehiclePhotos([...vehiclePhotos, result.assets[0].uri]);
          }
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleRetakePrompt = (index: number) => {
    Alert.alert("Retake Image", "Do you want to replace this photo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Retake",
        onPress: () => {
          handleReplaceImage(index);
        },
      },
    ]);
  };

  const handleReplaceImage = async (index: number) => {
    Alert.alert("Upload Vehicle Photo", "Choose an option", [
      {
        text: "Take Photo",
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.7,
          });
          if (!result.canceled) {
            const updated = [...vehiclePhotos];
            updated[index] = result.assets[0].uri;
            setVehiclePhotos(updated);
          }
        },
      },
      {
        text: "Choose from Gallery",
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
          });
          if (!result.canceled) {
            const updated = [...vehiclePhotos];
            updated[index] = result.assets[0].uri;
            setVehiclePhotos(updated);
          }
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Vehicle Information</Text>
      <Text style={styles.subtitle}>Enter details about your vehicle</Text>

      <Text style={styles.label}>Vehicle Type</Text>
      <View style={styles.iconRow}>
        {vehicleTypes.map((type) => (
          <TouchableOpacity
            key={type.label}
            style={[styles.iconBox, vehicleType === type.label && styles.iconBoxSelected]}
            onPress={() => setVehicleType(type.label)}
          >
            <MaterialIcons name={type.icon} size={32} color={vehicleType === type.label ? "#007BFF" : "#888"} />
            <Text style={styles.iconLabel}>{type.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

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
        onChangeText={(text) => {
          if (text.length <= 8) setVehicleNumber(text);
        }}
        placeholder="e.g. LEB12345"
        placeholderTextColor="#A9A9A9"
        maxLength={8}
      />

      <Text style={styles.label}>Upload Vehicle Photos (1–5)</Text>
      <View style={styles.photoRow}>
        {vehiclePhotos.map((uri, index) => (
          <TouchableOpacity key={index} onPress={() => handleRetakePrompt(index)}>
            <Image source={{ uri }} style={styles.photo} />
          </TouchableOpacity>
        ))}
        {vehiclePhotos.length < 5 && (
          <TouchableOpacity style={styles.uploadBox} onPress={handlePhotoChoice}>
            <MaterialIcons name="add-a-photo" size={32} color="#888" />
            <Text style={styles.uploadText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>Register</Text>
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
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  iconBox: {
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 4,
  },
  iconBoxSelected: {
    borderColor: "#007BFF",
    backgroundColor: "#e6f0ff",
  },
  iconLabel: {
    marginTop: 6,
    fontSize: 14,
    color: "#444",
  },
  photoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  uploadBox: {
    width: 90,
    height: 90,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    fontSize: 12,
    color: "#888",
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

