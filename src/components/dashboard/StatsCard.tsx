import { View, Text } from "react-native";

interface Props {
  title: string;
  value: string;
}

export default function StatsCard({
  title,
  value,
}: Props) {
  return (
    <View className="mr-3 rounded-3xl bg-white p-5">
      <Text className="text-slate-500">
        {title}
      </Text>

      <Text className="mt-2 text-3xl font-bold">
        {value}
      </Text>
    </View>
  );
}