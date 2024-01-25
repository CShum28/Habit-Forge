import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
});

export const habitsApi = createApi({
  baseQuery,
  reducerPath: "habitsApi",
  tagTypes: ["Habits"],
  endpoints: (builder) => ({
    getHabitsById: builder.query({
      query: (categoryId) => {
        return {
          url: `/api/habit?categoryId=${categoryId}`,
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
  }),
});

export const { useGetHabitsByIdQuery } = habitsApi;
