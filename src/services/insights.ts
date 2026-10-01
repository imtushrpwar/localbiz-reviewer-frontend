import api from "./api";

export const getInsights = async () => {
  const response = await api.get("/insights");
  return response.data;
};

export const generateInsights = async () => {
  const response = await api.post("/insights/generate");
  return response.data;
};