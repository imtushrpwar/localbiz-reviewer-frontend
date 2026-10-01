import api from "./api";

export const getDashboardData = async () => {
  const [dashboardResponse, insightsResponse] = await Promise.all([
    api.get("/review/dashboard"),
    api.get("/insights"),
  ]);

  const dashboard = dashboardResponse.data;
  const insightData = insightsResponse.data;

  return {
    stats: {
      averageRating: dashboard.averageRating,
      totalReviews: dashboard.totalReviews,
      positiveRate: `${dashboard.sentimentCount.positive}`,
      negativeRate: `${dashboard.sentimentCount.negative}`,
    },

    reviews: dashboard.latestReviews || [],

    insights: [
      { 
        title: insightData.insights.summary,
      },

      ...(insightData.insights.suggestions || []).map(
        (suggestion: string) => ({
          title: suggestion,
        })
      ),
    ],
  };
};