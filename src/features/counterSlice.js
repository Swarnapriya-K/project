import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 }, // Initial state of the counter
  reducers: {
    increment: (state, action) => {
      state.value += 1; // Increment logic
    },
    decrement: (state) => {
      state.value -= 1; // Decrement logic
    }
  }
});

// Export actions and reducer
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
