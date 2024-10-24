import { Pace } from "@/lib/types/Pace";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import { EVENT_ID_NAME, msToTime, splitToIcon, isUserLive } from "@/lib/utils/frontendConverters";
import { FontAwesome5 } from "@expo/vector-icons";

interface PaceCardProps extends Pace {
  onPress: () => void;
}

const PaceCard = ({ eventList, nickname, user, onPress }: PaceCardProps) => {
  return (
    <TouchableOpacity
      className="flex flex-row w-full items-center h-28 px-4 my-2 gap-4 rounded-xl bg-gray-300 dark:bg-[#1f2937]"
      activeOpacity={0.75}
      onPress={onPress}
    >
      {/* MINECRAFT SKIN AVATAR */}
      <View>
        <Image
          source={`https://mc-heads.net/avatar/${user.uuid}`}
          style={{ height: 50, width: 50 }}
          placeholder={require("@/assets/images/steve.png")}
        />
      </View>
      {/* USERNAME + CURRENT SPLIT */}
      <View className="flex flex-1">
        <View className="flex flex-row items-center gap-2">
          <Text className="text-black dark:text-white text-2xl font-bold max-w-full truncate">{nickname}</Text>
          {isUserLive(user.liveAccount) && <FontAwesome5 name="twitch" size={16} color="white" />}
        </View>
        <View className="flex flex-row items-start gap-1">
          <Image source={splitToIcon(eventList.length - 1)} style={{ width: 15, height: 15 }} />
          <Text className="text-black dark:text-white">{EVENT_ID_NAME[eventList.length - 1]}</Text>
        </View>
      </View>
      {/* IN GAME TIME */}
      <Text className="text-black dark:text-white text-4xl font-bold">
        {msToTime(eventList[eventList.length - 1].igt)}
      </Text>
    </TouchableOpacity>
  );
};
export default PaceCard;
