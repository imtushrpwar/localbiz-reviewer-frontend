import { useEffect, useState } from "react";
import { Text } from "react-native";
import { getBusiness } from "@/services/business";

export default function HeaderTitle() {
  const [businessName, setBusinessName] = useState("");

  useEffect(() => {
    loadBusiness();
  }, []);

  const loadBusiness = async () => {
    try {
      const response = await getBusiness();

      if (response?.business?.businessName) {
        setBusinessName(response.business.businessName);
      }
    } catch (error) {
      setBusinessName("LocalBiz Reviewer");
    }
  };

  return (
    <Text
      className="text-2xl font-bold text-slate-800"
      numberOfLines={1}
    >
      {businessName}
    </Text>
  );
}