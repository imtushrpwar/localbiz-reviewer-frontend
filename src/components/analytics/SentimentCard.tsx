import { Text, View } from "react-native";

interface Props {
  title: string;
  value: number;
}

export default function SentimentCard({
  title,
  value,
}: Props) {
  return (
    <View className="flex-1 rounded-2xl bg-white p-4">
      <Text className="text-slate-500">
        {title}
      </Text>

      <Text className="mt-2 text-xl font-bold">
        {value}
      </Text>
    </View>
  );
}