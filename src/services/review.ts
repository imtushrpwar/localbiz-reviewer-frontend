import api from "./api";

export const getReviews = async (page = 1) => {
  const response = await api.get(`/review/business/all?page=${page}`);

  return response.data;
};

export const createReview = async (data: any) => {
  const response = await api.post("/review", data);
  return response.data;
};
