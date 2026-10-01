import { useEffect } from "react";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({
  children,
}: AuthProviderProps) {
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");

      if (!token) {
        router.replace("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <>{children}</>;
}