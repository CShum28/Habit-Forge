import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { username: null, firstName: null, lastName: null },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { username, firstName, lastName } = action.payload;
      state.value.username = username;
      state.value.firstName = firstName;
      state.value.lastName = lastName;
      localStorage.setItem("username", username);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
    },
    logOut: (state, action) => {
      state.value.username = null;
      state.value.firstName = null;
      state.value.lastName = null;
      localStorage.removeItem("username");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
    },
    // Reducer to initialize the state from localStorage
    initializeAuth: (state) => {
      const username = localStorage.getItem("username");
      const firstName = localStorage.getItem("firstName");
      const lastName = localStorage.getItem("lastName");

      state.value.username = username;
      state.value.firstName = firstName || state.value.firstName; // Don't overwrite if null/undefined
      state.value.lastName = lastName || state.value.lastName; // Don't overwrite if null/undefined
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCredentials, logOut, initializeAuth } = authSlice.actions;

export default authSlice.reducer;
