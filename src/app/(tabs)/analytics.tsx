import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View, RefreshControl } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import AnalyticsCard from "@/components/analytics/AnalyticsCard";
import SentimentCard from "@/components/analytics/SentimentCard";
import RecentReviewCard from "@/components/analytics/RecentReviewCard";
import KeywordCard from "@/components/analytics/KeywordCard";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

import { getAnalytics } from "@/services/analytics";

export default function Analytics() {
  const [loading, setLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);
  const [dashboard, setDashboard] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);

  
useFocusEffect(
  useCallback(() => {
        loadAnalytics();

  }, [])
);
  const loadAnalytics = async () => {
    try {
      const response = await getAnalytics();

      setDashboard(response.dashboard);
      setInsights(response.insights);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const onRefresh = async () => {
  setRefreshing(true);

  await loadAnalytics();

  setRefreshing(false);
};

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView className="px-5" refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <Text className="mb-5 text-3xl font-bold">Analytics</Text>

        <View className="mb-4 flex-row gap-3">
          <AnalyticsCard
            title="Average Rating"
            value={dashboard?.averageRating ?? 0}
          />

          <AnalyticsCard
            title="Total Reviews"
            value={dashboard?.totalReviews ?? 0}
          />
        </View>

        <View className="flex-row gap-3">
          <SentimentCard
            title="Positive"
            value={dashboard?.sentimentCount?.positive ?? 0}
          />

          <SentimentCard
            title="Negative"
            value={dashboard?.sentimentCount?.negative ?? 0}
          />
        </View>
        <Text className="mb-3 mt-6 text-xl font-bold">Recent Reviews</Text>

        {dashboard?.latestReviews?.length ? (
          dashboard.latestReviews.map((review: any) => (
            <RecentReviewCard
              key={review._id}
              customerName={review.customerName}
              rating={review.rating}
              feedback={review.feedback}
            />
          ))
        ) : (
          <Text className="text-slate-500">No reviews available.</Text>
        )}

        
      </ScrollView>
    </SafeAreaView>
  );
}
