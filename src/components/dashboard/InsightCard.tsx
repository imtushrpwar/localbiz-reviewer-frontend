import { View, Text } from "react-native";

interface Props {
  title: string;
}

export default function InsightCard({ title }: Props) {
  return (
    <View className="mb-4 rounded-3xl bg-blue-600 p-5">
      <Text className="text-base font-semibold text-white">
         {title}
      </Text>
    </View>
  );
}