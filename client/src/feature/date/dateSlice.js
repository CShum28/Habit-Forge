import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: new Date().toISOString(), // Store date as an ISO string or RTK will throw an error in console
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    increaseDate: (state) => {
      const newDate = new Date(state.value);
      newDate.setDate(newDate.getDate() + 1);
      state.value = newDate.toISOString();
    },
    decreaseDate: (state) => {
      const newDate = new Date(state.value);
      newDate.setDate(newDate.getDate() - 1);
      state.value = newDate.toISOString();
    },
    setDate: (state, action) => {
      state.value = action.payload.toISOString();
    },
  },
});

export const { increaseDate, decreaseDate, setDate } = dateSlice.actions;

export default dateSlice.reducer;
