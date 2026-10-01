import { View, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({
  value,
  onChangeText,
}: Props) {
  return (
    <View className="mb-5 flex-row items-center rounded-2xl bg-white px-4 py-2">
      <Ionicons
        name="search-outline"
        size={20}
        color="#64748B"
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search reviews..."
        placeholderTextColor="#64748B"
        className="ml-3 flex-1 text-slate-700"
      />
    </View>
  );
}