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
      // state.value.token = token;
      localStorage.setItem("username", username);
    },
    logOut: (state, action) => {
      state.value.username = null;
      state.value.firstName = null;
      state.value.lastName = null;
      // state.value.token = null;
      localStorage.removeItem("username");
    },
    // Reducer to initialize the state from localStorage
    initializeAuth: (state, action) => {
      state.value.username = action.payload.username;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCredentials, logOut, initializeAuth } = authSlice.actions;

export default authSlice.reducer;

// new code

// export const selectCurrentUser = (state) => state.auth.value.username;
// export const selectCurrentToken = (state) => state.auth.value.token;
