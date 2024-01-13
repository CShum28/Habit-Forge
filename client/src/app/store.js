import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../feature/auth/authSlice";
import dateSliceReducer from "../feature/date/dateSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    date: dateSliceReducer,
  },
});

export default store;
