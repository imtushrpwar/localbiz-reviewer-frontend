import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import BusinessForm from "@/components/business/BusinessForm";

import {
  getBusiness,
  createBusiness,
  updateBusiness,
} from "@/services/business";

export default function Business() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isNewBusiness, setIsNewBusiness] = useState(false);

  const [form, setForm] = useState({
    businessName: "",
    category: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    description: "",
  });

  useEffect(() => {
    loadBusiness();
  }, []);

  const loadBusiness = async () => {
    try {
      setLoading(true);

      const response = await getBusiness();

      if (response?.business) {
        setForm(response.business);
        setIsNewBusiness(false);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setIsNewBusiness(true);
      } else {
        Alert.alert(
          "Error",
          "Unable to load business information."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      if (isNewBusiness) {
        await createBusiness(form);

        Alert.alert(
          "Success",
          "Business created successfully."
        );

        router.replace("/(tabs)");
      } else {
        await updateBusiness(form);

        Alert.alert(
          "Success",
          "Business updated successfully."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Unable to save business.");
    } finally {
      setSaving(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    await loadBusiness();

    setRefreshing(false);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView
        className="px-5"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <BusinessForm
          form={form}
          saving={saving}
          setForm={setForm}
          onSave={handleSave}
        />
      </ScrollView>
    </SafeAreaView>
  );
}