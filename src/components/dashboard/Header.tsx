import { useEffect, useState } from "react";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { getUnreadCount } from "@/services/notification";

export default function Header() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadUnreadCount();
  }, []);

  const loadUnreadCount = async () => {
    try {
      const response = await getUnreadCount();

      setCount(response.count || 0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="mb-8 flex-row items-center justify-between">
      <View>
        <Text className="text-base font-medium text-blue-700">
          Welcome back 👋
        </Text>

        <Text className="mt-1 text-2xl font-bold text-slate-900">
          LocalBiz Reviewer
        </Text>
      </View>

      <View className="flex-row items-center">
        <TouchableOpacity
          className="relative mr-4"
          onPress={() => router.push("/notifications")}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#0f172a"
          />

          {count > 0 && (
            <View
              className="absolute -right-2 -top-2
                         h-5 w-5 items-center
                         justify-center rounded-full
                         bg-red-500"
            >
              <Text className="text-xs font-bold text-white">
                {count}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/profile")}
        >
          <Ionicons
            name="person-circle-outline"
            size={28}
            color="#0f172a"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}