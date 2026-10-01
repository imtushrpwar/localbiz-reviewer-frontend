import { Text, View } from "react-native";

interface Props {
  name: string;
  email: string;
}

export default function ProfileCard({
  name,
  email,
}: Props) {
  return (
    <View className="mb-5 items-center rounded-3xl bg-white p-6">
      <Text className="text-4xl">👤</Text>

      <Text className="mt-3 text-xl font-bold">
        {name}
      </Text>

      <Text className="text-slate-500">
        {email}
      </Text>
    </View>
  );
}