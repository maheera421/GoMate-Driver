import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function DriverLicense() {
  const router = useRouter();
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);

  const pickImage = async (side: "front" | "back") => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Access to gallery is needed.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      side === "front" ? setFrontImage(uri) : setBackImage(uri);
    }
  };

  const handleNext = () => {
    if (!frontImage || !backImage) {
      Alert.alert("Both sides required", "Please upload both sides of your license.");
      return;
    }

    // TODO: send to backend
    router.push("/vehicle-info" as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Driver’s License</Text>
      <Text style={styles.subtitle}>Both sides must be clear and visible.</Text>

      <Text style={styles.label}>License Front</Text>
      {frontImage ? (
        <Image source={{ uri: frontImage }} style={styles.image} />
      ) : (
        <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage("front")}>
          <Text style={styles.uploadText}>Upload Front</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.label}>License Back</Text>
      {backImage ? (
        <Image source={{ uri: backImage }} style={styles.image} />
      ) : (
        <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage("back")}>
          <Text style={styles.uploadText}>Upload Back</Text>
        </TouchableOpacity>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#fff",
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
    marginTop: 20,
    marginBottom: 5,
    fontWeight: "600",
  },
  uploadBox: {
    height: 160,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  uploadText: {
    color: "#888",
    fontSize: 15,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    resizeMode: "cover",
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
