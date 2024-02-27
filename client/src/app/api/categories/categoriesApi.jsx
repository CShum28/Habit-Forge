import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
});

export const categoriesApi = createApi({
  baseQuery,
  reducerPath: "categoriesApi",
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategoriesById: builder.query({
      query: () => {
        return {
          url: "/api/category",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          credentials: "include",
        };
      },
      transformResponse: async (response) => {
        // console.log(response);
        return response;
      },
    }),
  }),
});

export const { useGetCategoriesByIdQuery } = categoriesApi;
