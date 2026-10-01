import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  Text,
  View,
  RefreshControl,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";

import {
  getInsights,
  generateInsights,
} from "@/services/insights";

import InsightSection from "@/components/insights/InsightSection";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";

export default function Insights() {
  const [summary, setSummary] = useState("");
  const [strengths, setStrengths] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [generating, setGenerating] = useState(false);

  useFocusEffect(
  useCallback(() => {
    loadInsights();
  }, [])
);

  const loadInsights = async () => {
    try {
      const response = await getInsights();

      console.log("INSIGHTS RESPONSE:", response);

      const data = response.insights;

      setSummary(data.summary || "");
      setStrengths(data.strengths || []);
      setWeaknesses(data.weaknesses || []);
      setSuggestions(data.suggestions || []);
    } catch (error: any) {
      console.log(
        "GET INSIGHTS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateInsights = async () => {
    try {
      setGenerating(true);

      const response = await generateInsights();

      console.log("GENERATED INSIGHTS:", response);

      const data = response.insights;

      setSummary(data.summary || "");
      setStrengths(data.strengths || []);
      setWeaknesses(data.weaknesses || []);
      setSuggestions(data.suggestions || []);
    } catch (error: any) {
      console.log(
        "GENERATE INSIGHTS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setGenerating(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    await loadInsights();

    setRefreshing(false);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="mt-3 text-slate-600">
          Loading insights...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        className="px-5"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Text className="mb-5 text-2xl font-bold">
          AI Insights
        </Text>

        <Pressable
          onPress={handleGenerateInsights}
          disabled={generating}
          className="mb-5 rounded-2xl bg-blue-600 p-4"
        >
          {generating ? (
            <View className="flex-row items-center justify-center">
              <ActivityIndicator color="white" />
              <Text className="ml-2 font-bold text-white">
                Generating...
              </Text>
            </View>
          ) : (
            <Text className="text-center font-bold text-white">
              ✨ Generate AI Insights
            </Text>
          )}
        </Pressable>

        <View className="mb-5 rounded-3xl bg-white p-5">
          <Text className="mb-2 text-lg font-bold">
            Summary
          </Text>

          <Text className="text-slate-600">
            {summary || "No insights generated yet."}
          </Text>
        </View>

        <InsightSection
          title="⭐ Strengths"
          data={strengths}
          emptyMessage="No strengths available."
        />

        <InsightSection
          title="⚠️ Weaknesses"
          data={weaknesses}
          emptyMessage="No weaknesses available."
        />

        <InsightSection
          title="💡 Suggestions"
          data={suggestions}
          emptyMessage="No suggestions available."
        />
      </ScrollView>
    </SafeAreaView>
  );
}