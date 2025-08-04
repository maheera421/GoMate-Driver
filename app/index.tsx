import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const steps = [
  { title: "Basic Info", route: "/driver-basic-info", icon: "person" },
  { title: "CNIC", route: "/cnic-images", icon: "credit-card" },
  { title: "Selfie with ID", route: "/selfie-with-id", icon: "photo-camera" },
  { title: "Driver’s License", route: "/driver's-license", icon: "badge" },
  { title: "Vehicle Info", route: "/vehicle-info", icon: "directions-car" },
];

export default function DriverRegistration() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Registration</Text>

      <View style={styles.stepList}>
        {steps.map((step, index) => (
          <TouchableOpacity
            key={index}
            style={styles.stepItem}
            onPress={() => router.push(step.route as any)}
          >
            <MaterialIcons name={step.icon as any} size={24} color="#000" />
            <Text style={styles.stepText}>{step.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push("/driver-basic-info" as never)}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
  padding: 24,
  paddingTop: 60,
  flexGrow: 1,
  backgroundColor: "#fff",
},
buttonWrapper: {
  marginTop: 32,
  marginBottom: 40,  // ← pushes button up from bottom
},
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 29,
  },
  stepList: {
    gap: 15,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    gap: 12,
  },
  stepText: {
    fontSize: 16,
  },
  continueButton: {
    marginTop: 29,
    backgroundColor: "#007BFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
