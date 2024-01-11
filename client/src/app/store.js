import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer, { setCredentials } from "../feature/auth/authSlice";
// import { getDecodedJWT } from "../utils/auth";

// const preloadedState = () => {
//   const decodedToken = getDecodedJWT();
//   if (decodedToken) {
//     return {
//       auth: {
//         username: decodedToken.username,
//         token: localStorage.getItem("jwt"),
//         isAuthenticated: true,
//       },
//     };
//   }
// };

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
  // preloadedState: preloadedState(),
});

export default store;
