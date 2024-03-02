import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const submitSlice = createSlice({
  name: "submit",
  initialState,
  reducers: {
    submitTrue: (state, action) => {
      state.value = true;
    },
    submitFalse: (state, action) => {
      state.value = false;
    },
  },
});

export const { submitTrue, submitFalse } = submitSlice.actions;
export default submitSlice.reducer;
