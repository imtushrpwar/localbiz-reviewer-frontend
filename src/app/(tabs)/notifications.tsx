import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import NotificationCard from "../../components/notification/NotificationCard";

import { getNotifications, markAsRead } from "@/services/notification";

export default function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();

      setNotifications(data.notifications || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openNotification = async (item: any) => {
    try {
      await markAsRead(item._id);

      setNotifications((previous) =>
        previous.map((notification) =>
          notification._id === item._id
            ? {
                ...notification,
                isRead: true,
              }
            : notification
        )
      );

      router.push({
        pathname: "/(tabs)/notification-details",
        params: {
          id: item._id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView className="p-5">
        <Text className="mb-6 text-3xl font-bold">Notifications</Text>

        {notifications.length > 0 ? (
          notifications.map((item) => (
            <NotificationCard
              key={item._id}
              id={item._id}
              title={item.title}
              message={item.message}
              createdAt={item.createdAt}
              isRead={item.isRead}
              onPress={() => openNotification(item)}
            />
          ))
        ) : (
          <Text className="text-center text-slate-500">
            No notifications available.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
