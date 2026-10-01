import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfileCard from "@/components/profile/ProfileCard";
import ProfileItem from "@/components/profile/ProfileItem";
import LogoutButton from "@/components/profile/LogoutButton";
import { getProfile } from "@/services/profile";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { Alert } from "react-native";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile();

      setProfile(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await SecureStore.deleteItemAsync("token");
          router.replace("/login");
        },
      },
    ]);
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
        <ProfileCard
          name={profile?.name || "User"}
          email={profile?.email || "No email"}
        />

        <ProfileItem label="User ID" value={profile?._id || "Not available"} />

        <ProfileItem label="Email" value={profile?.email || "Not available"} />

        <ProfileItem label="Role" value={profile?.role || "Not available"} />

        <LogoutButton onPress={handleLogout} />
      </ScrollView>
    </SafeAreaView>
  );
}
