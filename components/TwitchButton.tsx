import React from "react";
import { Text, TouchableOpacity, Linking } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface TwitchButtonProps {
  href: string | null;
}

const TwitchButton = ({ href }: TwitchButtonProps) => {
  if (!href) return null;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      disabled={href === null}
      onPress={() => {
        Linking.openURL(`https://twitch.tv/${href}`);
      }}
      className={`flex flex-row items-center p-3 gap-2 rounded-xl ${href !== null ? `bg-[#9146FF]` : `bg-gray-500`}`}
    >
      <FontAwesome5 name="twitch" size={24} color="white" />
      <Text numberOfLines={1} className="text-white text-lg font-bold">
        {href || "Offline Run"}
      </Text>
    </TouchableOpacity>
  );
};

export default TwitchButton;
