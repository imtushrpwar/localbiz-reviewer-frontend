import api from "./api";

export const getBusiness = async () => {
  const response = await api.get("/business");
  return response.data;
};

export const updateBusiness = async (data: any) => {
  const response = await api.put("/business", data);
  return response.data;
};

export const checkBusiness = async () => {
  const response = await api.get("/business/check");
                                                                                                                          
  return response.data;
};

export const createBusiness = async (data: any) => {
  const response = await api.post("/business", data);
  return response.data;
};