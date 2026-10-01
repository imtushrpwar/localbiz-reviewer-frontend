import {
  ScrollView,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import SearchBar from "@/components/reviews/SearchBar";
import FilterButton from "@/components/reviews/FilterButton";
import ReviewCard from "@/components/reviews/ReviewCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import { getReviews } from "@/services/review";
import { useFocusEffect } from "expo-router";
export default function Reviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [refreshing, setRefreshing] = useState(false);

 

  
    useFocusEffect(
      useCallback(() => {
        loadReviews();
      }, [])
    );

  
const onRefresh = async () => {
  setRefreshing(true);

  try {
    await loadReviews();
  } catch (error) {
    console.log(error);
  } finally {
    setRefreshing(false);
  }
};

 

  const searchReviews = (text: string) => {
    setSearch(text);

    if (!text.trim()) {
      setFilteredReviews(reviews);
      return;
    }

    const filtered = reviews.filter((item: any) => {
      const customerName = item.customerName?.toLowerCase() || "";
      const feedback = item.feedback?.toLowerCase() || "";

      return (
        customerName.includes(text.toLowerCase()) ||
        feedback.includes(text.toLowerCase())
      );
    });

    setFilteredReviews(filtered);
  };

  const loadReviews = async () => {
    try {
      const response = await getReviews();

      const data = response.reviews || [];

      setReviews(data);
      setFilteredReviews(data);
    } catch (error) {
      console.log(error);
    }
  };

  const applyFilter = (type: string) => {
    setFilter(type);

    if (type === "All") {
      setFilteredReviews(reviews);
      return;
    }

    const result = reviews.filter(
      (item) => item.sentiment === type.toLowerCase()
    );

    setFilteredReviews(result);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView
        className="px-5"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text className="mb-5 text-3xl font-bold">Reviews</Text>

        <SearchBar value={search} onChangeText={searchReviews} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FilterButton
            title="All"
            active={filter === "All"}
            onPress={() => applyFilter("All")}
          />

          <FilterButton
            title="Positive"
            active={filter === "Positive"}
            onPress={() => applyFilter("Positive")}
          />

          <FilterButton
            title="Neutral"
            active={filter === "Neutral"}
            onPress={() => applyFilter("Neutral")}
          />

          <FilterButton
            title="Negative"
            active={filter === "Negative"}
            onPress={() => applyFilter("Negative")}
          />
        </ScrollView>

        <View className="mt-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((item: any) => (
              <ReviewCard
                key={item._id}
                name={item.customerName}
                review={item.feedback}
                rating={item.rating}
                sentiment={item.sentiment}
              />
            ))
          ) : (
            <Text className="text-center text-slate-500">
              No reviews found.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
