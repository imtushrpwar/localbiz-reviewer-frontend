import { Text, View } from "react-native";

interface Props {
  title: string;
  value: string;
}

export default function StatsCard({
  title,
  value,
}: Props) {
  return (
    <View className="mr-3 w-40 rounded-3xl bg-white p-5 shadow">
      <Text className="text-slate-500">
        {title}
      </Text>

      <Text className="mt-2 text-3xl font-bold">
        {value}
      </Text>
    </View>
  );
}