import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useBusinessStatus } from "@/hooks/useBusinessStatus";
import AppHeader from "@/components/layout/AppHeader";
import { ActivityIndicator, View } from "react-native";
import HeaderTitle from "@/components/layout/HeaderTitle";


export default function TabLayout() {
  //   const { hasBusiness, loading } = useBusinessStatus();

  //   if (loading) {
  //   return (
  //     <View className="flex-1 items-center justify-center">
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: () => <HeaderTitle />,
        headerRight: () => <AppHeader />,

        headerTitleStyle: {
          fontWeight: "700",
        },

        headerShadowVisible: false,

        tabBarStyle: {
          height: 70,
          borderTopWidth: 0,
          elevation: 0,
          paddingBottom: 10,
          paddingTop: 10,
        },

        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#64748B",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",

          // headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="reviews"
        options={{
          title: "Reviews",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" color={color} size={size} />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" color={color} size={size} />
          ),
        }}
      /> */}

      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="notification-details"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="qr"
        options={{
          title: "QR",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="qr-code-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="business"
        options={{
          title: "Settings",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      /> */}

      <Tabs.Screen
        name="profile"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
