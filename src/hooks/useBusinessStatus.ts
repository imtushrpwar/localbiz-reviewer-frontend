import { useEffect, useState } from "react";
import { checkBusiness } from "@/services/business";

export function useBusinessStatus() {
  const [hasBusiness, setHasBusiness] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      const response = await checkBusiness();
      setHasBusiness(response.hasBusiness);
    } catch {
      setHasBusiness(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    hasBusiness,
    loading,
  };
}