import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  onPress: () => void;
}

export default function NotificationCard({
  id,
  title,
  message,
  createdAt,
  isRead,
  onPress,
}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={`mb-4 rounded-3xl p-5 ${
          isRead ? "bg-white" : "bg-blue-100"
        }`}
      >
        <Text className="text-lg font-semibold text-slate-900">{title}</Text>

        <Text className="mt-2 text-slate-500">{message}</Text>

        <Text className="mt-3 text-xs text-slate-400">
          {new Date(createdAt).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
