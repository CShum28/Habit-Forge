import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    updateTrue: (state, action) => {
      state.value = true;
    },
    updateFalse: (state, action) => {
      state.value = false;
    },
  },
});

export const { updateTrue, updateFalse } = updateSlice.actions;
export default updateSlice.reducer;
