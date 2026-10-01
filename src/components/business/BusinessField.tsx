import { Text, TextInput, View } from "react-native";

interface BusinessFieldProps {
  label: string;
  value: string;
  multiline?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad";
  onChangeText: (value: string) => void;
}

export default function BusinessField({
  label,
  value,
  multiline = false,
  keyboardType = "default",
  onChangeText,
}: BusinessFieldProps) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-base font-semibold">
        {label}
      </Text>

      <TextInput
        value={value}
        multiline={multiline}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        className="rounded-xl border border-slate-300 bg-white p-4"
        textAlignVertical="top"
      />
    </View>
  );
}