import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
});

export const weeklyReviewApi = createApi({
  baseQuery,
  reducerPath: "weeklyReviewApi",
  tagTypes: ["WeeklyReview"],
  endpoints: (builder) => ({
    getWeeklyReviews: builder.query({
      query: () => {
        return {
          url: `/api/weekly-review`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          credentials: "include",
        };
      },
      transformResponse: async (response) => {
        return response;
      },
    }),
    // New endpoint to get a single weekly review by date
    getWeeklyReviewByDate: builder.query({
      query: (date) => ({
        url: `/api/weekly-review/${date}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const { useGetWeeklyReviewsQuery, useGetWeeklyReviewByDateQuery } =
  weeklyReviewApi;
