import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";

export default function StatsLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "PaceMan.gg",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
        }}
      />
    </Stack>
  );
}
