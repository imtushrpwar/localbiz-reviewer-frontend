// import { useEffect, useState } from "react";
// import { ScrollView, Text } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import { getBusiness } from "@/services/business";
// import QRCard from "@/components/qr/QRCard";

// export default function QRScreen() {
//   const [business, setBusiness] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadBusiness();
//   }, []);

//   const loadBusiness = async () => {
//     try {
//       const response = await getBusiness();

//       setBusiness(response.business);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-slate-100">
//       <ScrollView className="p-5">
//         <QRCard
//           businessName={business?.businessName}
//           category={business?.category}
//           qrCode={business?.qrCode}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Share,
  Text,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { SafeAreaView } from "react-native-safe-area-context";

import QRCard from "@/components/qr/QRCard";
import { getBusiness } from "@/services/business";


export default function QRScreen() {
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBusiness();
  }, []);


  const loadBusiness = async () => {
    try {
      setLoading(true);

      const response = await getBusiness();

      if (!response?.business) {
        Alert.alert(
          "Error",
          "Business information could not be loaded."
        );
        return;
      }

      setBusiness(response.business);
    } catch (error) {
      console.log(error);

      // Alert.alert(
      //   "Error",
      //   "Unable to connect to the server."
      // );
    } finally {
      setLoading(false);
    }
  };

  const reviewUrl = business?.slug
    ? `https://customer-review-app-five.vercel.app/review/${business.slug}`
    : "";

  const copyLink = async () => {
    try {
      if (!reviewUrl) {
        Alert.alert("Error", "Review link not found.");
        return;
      }

      await Clipboard.setStringAsync(reviewUrl);

      Alert.alert("Success", "Link copied.");
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Unable to copy link.");
    }
  };

  const shareLink = async () => {
    try {
      if (!reviewUrl) {
        Alert.alert("Error", "Review link not found.");
        return;
      }

      await Share.share({
        message: reviewUrl,
      });
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Unable to share link.");
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!business) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>No business found.</Text>
      </SafeAreaView>
    );
  }

  

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView className="p-5">
        <QRCard
          businessName={business.businessName}
          category={business.category}
          qrCode={business.qrCode}
          reviewUrl={reviewUrl}
          onCopy={copyLink}
          onShare={shareLink}
        />
      </ScrollView>
    </SafeAreaView>
  );
}