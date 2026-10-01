import { Text, TouchableOpacity } from "react-native";

interface Props {
  onPress: () => void;
}

export default function LogoutButton({
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mt-4 rounded-2xl bg-red-500 p-4"
    >
      <Text className="text-center font-semibold text-white">
        Logout
      </Text>
    </TouchableOpacity>
  );
}