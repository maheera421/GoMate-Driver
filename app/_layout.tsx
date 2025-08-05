// 📄 app/_layout.tsx

import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Register as Driver" }} />
        <Stack.Screen name="driver-basic-info" options={{ title: "Basic Info" }} />
        <Stack.Screen name="cnic-images" options={{ title: "CNIC Verification" }} />
        <Stack.Screen name="selfie-with-id" options={{ title: "ID Confirmation" }} />
        <Stack.Screen name="driver's-license" options={{ title: "Driver's License" }} />
        <Stack.Screen name="vehicle-info" options={{ title: "Vehicle Info" }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
