import { TouchableOpacity, Text } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
}

export default function AppButton({
  title,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      className="rounded-2xl bg-blue-600 py-4"
      onPress={onPress}
    >
      <Text className="text-center font-semibold text-white">
        {title}
      </Text>
    </TouchableOpacity>
  );
}