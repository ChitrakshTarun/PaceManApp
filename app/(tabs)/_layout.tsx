import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { TabBarIcon } from "@/components/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      {/* HOME SCREEN - Paces */}
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          tabBarLabel: "PaceMan",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "stopwatch" : "stopwatch-outline"} color={color} />
          ),
        }}
      />

      {/* LEADERBOARD SCREEN */}

      <Tabs.Screen
        name="leaderboard"
        options={{
          headerShown: false,
          tabBarLabel: "Leaderboard",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "stats-chart" : "stats-chart-outline"} color={color} />
          ),
        }}
      />

      {/* EVENTS SCREEN */}

      <Tabs.Screen
        name="events"
        options={{
          headerShown: false,
          tabBarLabel: "Events",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "calendar" : "calendar-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
