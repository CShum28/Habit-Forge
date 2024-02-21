import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../feature/auth/authSlice";
import dateSliceReducer from "../feature/date/dateSlice";

import { categoriesApi } from "./api/categories/categoriesApi";
import { habitsApi } from "./api/habits/habitsApi";
import { weeklyReviewApi } from "./api/weekly-review/weeklyReviewApi";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    date: dateSliceReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [habitsApi.reducerPath]: habitsApi.reducer,
    [weeklyReviewApi.reducerPath]: weeklyReviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(categoriesApi.middleware)
      .concat(habitsApi.middleware)
      .concat(weeklyReviewApi.middleware);
  },
});

export default store;
