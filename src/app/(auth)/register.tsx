import { useState } from "react";
import { registerUser } from "@/services/auth";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser(name, email, password);
      router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 justify-center bg-white px-6">
      <Text className="mb-8 text-3xl font-bold text-gray-900">
        Create account
      </Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        className="mb-4 rounded-xl border border-gray-300 bg-gray-50 p-4"
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="mb-4 rounded-xl border border-gray-300 bg-gray-50 p-4"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="mb-6 rounded-xl border border-gray-300 bg-gray-50 p-4"
      />

      <TouchableOpacity
        className="mb-5 rounded-xl bg-blue-600 p-4"
        onPress={handleRegister}
      >
        <Text className="text-center text-base font-semibold text-white">
          Register
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-center text-gray-600">
          Back to login
        </Text>
      </TouchableOpacity>
    </View>
  );
}