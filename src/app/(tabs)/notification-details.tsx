import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getNotificationById } from "@/services/notification";

export default function NotificationDetails() {
  const { id } = useLocalSearchParams();

  const [notification, setNotification] = useState<any>(null);

  useEffect(() => {
    loadNotification();
  }, []);

  const loadNotification = async () => {
    try {
      const response = await getNotificationById(id as string);

      setNotification(response.notification);
    } catch (error) {
      console.log(error);
    }
  };

  if (!notification) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView className="p-5">
        <View className="rounded-3xl bg-white p-5">
          <Text className="text-2xl font-bold">
            {notification.title}
          </Text>

          <Text className="mt-2 text-slate-500">
            {notification.message}
          </Text>

          <View className="mt-5">
            <Text className="font-bold">
              Customer Name
            </Text>

            <Text>
              {notification.review?.customerName}
            </Text>
          </View>

          <View className="mt-5">
            <Text className="font-bold">
              Rating
            </Text>

            <Text>
              ⭐ {notification.review?.rating}
            </Text>
          </View>

          <View className="mt-5">
            <Text className="font-bold">
              Review
            </Text>

            <Text>
              {notification.review?.feedback}
            </Text>
          </View>

          <View className="mt-5">
            <Text className="font-bold">
              Sentiment
            </Text>

            <Text>
              {notification.review?.sentiment}
            </Text>
          </View>

          <View className="mt-5">
            <Text className="font-bold">
              Posted On
            </Text>

            <Text>
              {new Date(
                notification.review?.createdAt
              ).toLocaleString()}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}