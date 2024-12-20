import React from "react";
import { View } from "react-native";
import { MenuView } from "@react-native-menu/menu";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

interface DropDownMenuProps {
  selectedKey: string;
  onSelect: (key: string) => void;
}

const LBRightComponent: React.FC<DropDownMenuProps> = ({ selectedKey, onSelect }) => {
  const { colorScheme } = useColorScheme();

  const menuItems = [
    { key: "daily", label: "Daily" },
    { key: "weekly", label: "Weekly" },
    { key: "monthly", label: "Monthly" },
    { key: "all", label: "All" },
    { key: "current", label: "Trophy - Current" },
    { key: "season-1", label: "Trophy - Season 1" },
    { key: "season-2", label: "Trophy - Season 2" },
  ];

  const getTextColor = () => (colorScheme === "dark" ? "#FFFFFF" : "#000000");

  return (
    <View className="flex flex-row-reverse items-center">
      <MenuView
        title="Menu"
        onPressAction={({ nativeEvent }) => {
          const actionId = nativeEvent.event;
          if (menuItems.some((item) => item.key === actionId)) {
            onSelect(actionId);
          }
        }}
        actions={[
          ...menuItems.map((item) => ({
            id: item.key,
            title: item.label,
            titleColor: getTextColor(),
            state: selectedKey === item.key ? "on" : "off",
            attributes: selectedKey === item.key ? { selected: true } : undefined,
          })),
        ]}
      >
        <View className="mr-3">
          <Ionicons name="menu-outline" size={28} color={getTextColor()} />
        </View>
      </MenuView>
    </View>
  );
};

export default LBRightComponent;
