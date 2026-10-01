import { Text } from "react-native";

interface Props {
  sentiment: string;
}

export default function SentimentBadge({
  sentiment,
}: Props) {
  const styles = {
    positive: "bg-green-100 text-green-600",
    neutral: "bg-yellow-100 text-yellow-600",
    negative: "bg-red-100 text-red-600",
  };

  return (
    <Text
      className={`rounded-full px-3 py-2 text-xs font-semibold ${styles[sentiment as keyof typeof styles]}`}
    >
      {sentiment}
    </Text>
  );
}