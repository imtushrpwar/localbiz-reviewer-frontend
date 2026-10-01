import { Text, View } from "react-native";

interface Props {
  customerName: string;
  rating: number;
  feedback: string;
}

export default function RecentReviewCard({
  customerName,
  rating,
  feedback,
}: Props) {
  return (
    <View className="mb-3 rounded-2xl bg-white p-4">
      <View className="flex-row items-center justify-between">
        <Text className="font-semibold">
          {customerName}
        </Text>

        <Text>{rating} ⭐</Text>
      </View>

      <Text
        className="mt-2 text-slate-600"
        numberOfLines={2}
      >
        {feedback}
      </Text>
    </View>
  );
}