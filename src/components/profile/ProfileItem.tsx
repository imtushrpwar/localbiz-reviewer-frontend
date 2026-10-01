import { Text, View } from "react-native";

interface Props {
  label: string;
  value: string;
}

export default function ProfileItem({
  label,
  value,
}: Props) {
  return (
    <View className="mb-3 rounded-2xl bg-white p-4">
      <Text className="text-sm text-slate-500">
        {label}
      </Text>

      <Text className="mt-1 text-base font-semibold">
        {value}
      </Text>
    </View>
  );
}