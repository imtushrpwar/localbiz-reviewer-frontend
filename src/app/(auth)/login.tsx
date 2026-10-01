import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { loginUser } from "@/services/auth";
import { checkBusiness } from "@/services/business";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async () => {
  try {
    const response = await loginUser(email, password);

    await SecureStore.setItemAsync(
      "token",
      response.token
    );

    const businessResponse = await checkBusiness();

    if (businessResponse.hasBusiness) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(tabs)/business");
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="mb-8 text-3xl font-bold text-gray-900">
        LocalBiz Reviewer
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="mb-4 rounded-xl border border-gray-300 p-4"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="mb-4 rounded-xl border border-gray-300 p-4"
      />

      <TouchableOpacity
        className="mb-5 rounded-xl bg-blue-600 p-4"
        onPress={handleLogin}
      >
        <Text className="text-center font-semibold text-white">
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/register")}
      >
        <Text className="text-center text-gray-700">
          Create an account
        </Text>
      </TouchableOpacity>
    </View>
  );
}