import { View, Text } from "react-native";

interface Props {
  name: string;
  review: string;
  rating: number;
}

export default function ReviewCard({
  name,
  review,
  rating,
}: Props) {
  return (
    <View className="mb-4 rounded-3xl bg-white p-5 shadow-sm">
      <Text className="text-base font-bold text-slate-900">
        {name}
      </Text>

      <Text className="my-2 text-base text-yellow-500">
        {"⭐".repeat(rating)}
      </Text>

      <Text className="leading-6 text-slate-500">
        {review}
      </Text>
    </View>
  );
}