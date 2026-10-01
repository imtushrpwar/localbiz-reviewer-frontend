import { Text, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  active?: boolean;
  onPress?: () => void;
}

export default function FilterButton({
  title,
  active = false,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`mr-2 rounded-full px-4 py-2 ${
        active ? "bg-blue-600" : "bg-white"
      }`}
    >
      <Text
        className={`font-medium ${
          active ? "text-white" : "text-slate-600"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}