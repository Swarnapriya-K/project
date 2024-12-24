import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basketSlice";
import counterSlice from "./counterSlice";
const store = configureStore({
  reducer: {
    basket: basketReducer,
    counter: counterSlice
  }
});

export default store;
