import * as SystemUI from "expo-system-ui";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { storage } from "@/lib/utils/mmkv";
import { Platform } from "react-native";
import { useEffect } from "react";
import { SystemBars } from "react-native-edge-to-edge";
import { useColorsForUI } from "@/hooks/useColorsForUI";
import { useColorScheme } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";

import "@/global.css";
import { useMMKVString, useMMKVBoolean } from "react-native-mmkv";
const queryClient = new QueryClient();

export default function RootLayout() {
  const [theme, setTheme] = useMMKVString("settings-theme", storage);
  const [haptics, setHaptics] = useMMKVBoolean("settings-haptics", storage);
  const { colorScheme, setColorScheme } = useColorScheme();
  const { tintColor, backgroundColor } = useColorsForUI();

  // Fixes flicker on Android while switching between screens.
  SystemUI.setBackgroundColorAsync(backgroundColor);
  SplashScreen.preventAutoHideAsync();

  // Initialise MMKV
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    if (theme === undefined) {
      setTheme("dark");
    }
    if (haptics === undefined) {
      setHaptics(true);
    }
    SplashScreen.hideAsync();
  }, []);

  // Update Theme
  useEffect(() => setColorScheme(theme as "light" | "dark" | "system"), [theme]);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <SystemBars style={colorScheme === "dark" ? "light" : "dark"} />
            <Stack
              screenOptions={{
                headerTintColor: tintColor,
                headerShadowVisible: false,
                headerTransparent: Platform.select({
                  ios: true,
                  android: false,
                }),
                headerStyle: {
                  backgroundColor: Platform.select({
                    android: backgroundColor,
                  }),
                },
                headerBlurEffect: colorScheme === "light" ? "systemChromeMaterialLight" : "systemChromeMaterialDark",
              }}
            >
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
                initialParams={{ lbType: "monthly" }}
              />
              <Stack.Screen
                name="settings"
                options={{
                  headerTitle: "Settings",
                  headerBackTitle: "Back",
                }}
              />
              <Stack.Screen
                name="stats/player/[id]"
                options={{
                  headerBackTitle: "Back",
                }}
              />
              <Stack.Screen
                name="+not-found"
                options={{
                  headerTitle: "Page Not Found",
                  headerBackTitle: "Back",
                }}
              />
            </Stack>
          </ThemeProvider>
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
