import api from "./api";

export const getAnalytics = async () => {
  const [dashboardResponse, insightsResponse] =
    await Promise.all([
      api.get("/review/dashboard"),
      api.get("/insights"),
    ]);

  return {
    dashboard: dashboardResponse.data,
    insights: insightsResponse.data,
  };
};