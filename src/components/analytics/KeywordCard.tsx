import { Text, View } from "react-native";

interface Props {
  keyword: string;
}

export default function KeywordCard({
  keyword,
}: Props) {
  return (
    <View className="mb-2 mr-2 rounded-full bg-blue-100 px-4 py-2">
      <Text className="font-medium text-blue-700">
        {keyword}
      </Text>
    </View>
  );
}