import { Text, View } from "react-native";
import SentimentBadge from "./SentimentBadge";

interface Props {
  name: string;
  review: string;
  rating: number;
  sentiment: "positive" | "neutral" | "negative";
}

export default function ReviewCard({
  name,
  review,
  rating,
  sentiment,
}: Props) {
  return (
    <View className="mb-4 rounded-3xl bg-white p-5">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-bold">
          {name}
        </Text>

        <Text className="text-yellow-500">
          {"★".repeat(rating)}
        </Text>
      </View>

      <Text className="mt-3 text-slate-500">
        {review}
      </Text>

      <View className="mt-4">
        <SentimentBadge sentiment={sentiment} />
      </View>
    </View>
  );
}