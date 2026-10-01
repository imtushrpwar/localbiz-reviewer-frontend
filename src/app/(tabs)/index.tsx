import { ScrollView, View, Text, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import ReviewCard from "@/components/dashboard/ReviewCard";
import InsightCard from "@/components/dashboard/InsightCard";
import { useCallback, useEffect, useState } from "react";
import { getDashboardData } from "@/services/dashboard";
import { router, useFocusEffect } from "expo-router";
import { checkBusiness } from "@/services/business";

export default function Dashboard() {
  const [stats, setStats] = useState({
    averageRating: "0",
    totalReviews: "0",
    positiveRate: "0%",
    negativeRate: "0%",
  });
  const [refreshing, setRefreshing] = useState(false);

  const [reviews, setReviews] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchDashboard();
    }, [])
  );

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardData();

      setStats({
        averageRating: data?.stats?.averageRating?.toString() ?? "0",

        totalReviews: data?.stats?.totalReviews?.toString() ?? "0",

        positiveRate: data?.stats?.positiveRate?.toString() ?? "0%",

        negativeRate: data?.stats?.negativeRate?.toString() ?? "0%",
      });

      setReviews(data?.reviews ?? []);
      setInsights(data?.insights ?? []);
    } catch (error) {
      console.log(error);

      setStats({
        averageRating: "0",
        totalReviews: "0",
        positiveRate: "0%",
        negativeRate: "0%",
      });

      setReviews([]);
      setInsights([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const onRefresh = async () => {
    setRefreshing(true);

    await fetchDashboard();

    setRefreshing(false);
  };
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView
        className="px-5"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        {/* <Header /> */}

        {/* Statistics */}
        <Text className="mb-3 text-xl font-bold text-slate-800">
          Statistics
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <StatsCard
            title="Average Rating"
            value={stats?.averageRating ?? "0"}
          />

          <StatsCard title="Reviews" value={stats?.totalReviews ?? "0"} />

          <StatsCard title="Positive" value={stats?.positiveRate ?? "0%"} />
          <StatsCard title="Negative" value={stats?.negativeRate ?? "0%"} />
        </ScrollView>

        {/* Reviews */}
        <Text className="my-5 text-xl font-bold text-slate-800">
          Recent Reviews
        </Text>

        <View className="space-y-3">
          <View className="space-y-3">
            {reviews?.length > 0 ? (
              reviews.map((review: any, index: number) => (
                <ReviewCard
                  key={review?._id ?? index}
                  name={review?.customerName ?? "Anonymous"}
                  review={review?.feedback ?? "No review available"}
                  rating={review?.rating ?? 0}
                />
              ))
            ) : (
              <Text className="text-slate-500">No reviews available.</Text>
            )}
          </View>
        </View>

        {/* Insights */}
        <Text className="my-5 text-xl font-bold text-slate-800">
          AI Insights
        </Text>

        <View className="space-y-3">
          {insights?.length > 0 ? (
            insights.map((insight: any, index: number) => (
              <InsightCard
                key={index}
                title={insight?.title ?? "No insights available"}
              />
            ))
          ) : (
            <Text className="text-slate-500">No insights available.</Text>
          )}
        </View>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
