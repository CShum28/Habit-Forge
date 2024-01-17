import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../feature/auth/authSlice";
import dateSliceReducer from "../feature/date/dateSlice";

import { categoriesApi } from "./api/categories/categoriesApi";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    date: dateSliceReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(categoriesApi.middleware);
  },
});

export default store;
