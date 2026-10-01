import { TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function AppHeader() {
  return (
    <View className="mr-3 flex-row items-center gap-4">
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/notifications")}
      >
        <Ionicons
          name="notifications-outline"
          size={24}
          color="#0F172A"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/(tabs)/profile")}
      >
        <Ionicons
          name="person-circle-outline"
          size={28}
          color="#0F172A"
        />
      </TouchableOpacity>
    </View>
  );
}