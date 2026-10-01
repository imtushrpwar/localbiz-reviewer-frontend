import { Text, View } from "react-native";

interface Props {
  title: string;
  data: string[];
  emptyMessage?: string;
}

export default function InsightSection({
  title,
  data,
  emptyMessage = "No data available.",
}: Props) {
  return (
    <View className="mb-5 rounded-3xl bg-white p-5">
      <Text className="mb-4 text-lg font-bold">
        {title}
      </Text>

      {data.length > 0 ? (
        data.map((item, index) => (
          <Text
            key={index}
            className="mb-2 text-slate-600"
          >
            • {item}
          </Text>
        ))
      ) : (
        <Text className="text-slate-500">
          {emptyMessage}
        </Text>
      )}
    </View>
  );
}