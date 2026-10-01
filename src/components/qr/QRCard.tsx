// import { Image, Text, View } from "react-native";

// interface Props {
//   businessName: string;
//   category: string;
//   qrCode: string;
// }

// export default function QRCard({
//   businessName,
//   category,
//   qrCode,
// }: Props) {
//   return (
//     <View className="rounded-3xl bg-white p-6">
//       <Text className="text-center text-2xl font-bold">
//         {businessName}
//       </Text>

//       <Text className="mb-6 text-center text-slate-500">
//         {category}
//       </Text>

//       <View className="items-center">
//         <Image
//           source={{ uri: qrCode }}
//           className="h-64 w-64"
//         />
//       </View>

//       <Text className="mt-6 text-center text-slate-500">
//         Scan the QR code to submit a review.
//       </Text>


//     </View>
//   );
// }

import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  businessName: string;
  category: string;
  qrCode: string;
  reviewUrl: string;
  onCopy: () => void;
  onShare: () => void;
}

export default function QRCard({
  businessName,
  category,
  qrCode,
  reviewUrl,
  onCopy,
  onShare,
}: Props) {
  return (
    <View className="rounded-3xl bg-white p-6 shadow-sm">
      <Text className="text-center text-2xl font-bold">
        {businessName || "Business"}
      </Text>

      <Text className="mb-6 text-center text-slate-500">
        {category || "Category"}
      </Text>

      <View className="items-center">
        {qrCode ? (
          <Image
            source={{ uri: qrCode }}
            className="h-64 w-64"
            resizeMode="contain"
          />
        ) : (
          <View className="h-64 w-64 items-center justify-center rounded-2xl bg-slate-100">
            <Text>No QR code found.</Text>
          </View>
        )}
      </View>

      <Text className="mt-6 text-center text-slate-500">
        Scan the QR code to submit a review.
      </Text>

      <Text
        className="mt-3 text-center text-sm text-blue-600"
        numberOfLines={2}
      >
        {reviewUrl}
      </Text>

      <View className="mt-6 flex-row justify-between gap-2">
        <TouchableOpacity
          className="flex-1 rounded-xl bg-slate-200 p-3"
          onPress={onCopy}
        >
          <Text className="text-center font-semibold">
            Copy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 rounded-xl bg-blue-500 p-3"
          onPress={onShare}
        >
          <Text className="text-center font-semibold text-white">
            Share
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}