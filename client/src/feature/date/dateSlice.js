import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: new Date().toLocaleString(), // Store date as an ISO string or RTK will throw an error in console
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    increaseDate: (state) => {
      const newDate = new Date(state.value);
      newDate.setDate(newDate.getDate() + 1);
      state.value = newDate.toLocaleString();
    },
    decreaseDate: (state) => {
      const newDate = new Date(state.value);
      newDate.setDate(newDate.getDate() - 1);
      state.value = newDate.toLocaleString();
    },
    setDate: (state, action) => {
      const newDate = new Date(action.payload);
      state.value = newDate.toLocaleString();
    },
  },
});

export const { increaseDate, decreaseDate, setDate } = dateSlice.actions;

export default dateSlice.reducer;
