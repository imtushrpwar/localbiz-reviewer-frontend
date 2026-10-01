import { TextInput } from "react-native";

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
}

export default function AppInput({
  placeholder,
  value,
  onChangeText,
}: Props) {
  return (
    <TextInput
      className="mb-4 rounded-2xl border border-slate-300 bg-white p-4"
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
}