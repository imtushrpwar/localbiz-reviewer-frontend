import API from "./api";
import * as SecureStore from "expo-secure-store";


export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await API.post("/auth/register", {
    name,
    email,
    password,
  });

  return response.data;
};

export const isLoggedIn = async () => {
  const token = await SecureStore.getItemAsync("token");

  return !!token;
};