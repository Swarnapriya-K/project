import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basketSlice";

// Define the initial state structure matching your basket slice
const basketInitialState = {
  products: []
};

// Load basket from localStorage
const loadBasketFromStorage = () => {
  try {
    const serializedBasket = localStorage.getItem("basket");
    return serializedBasket ? JSON.parse(serializedBasket) : undefined;
  } catch (e) {
    console.warn("Failed to load basket from localStorage:", e);
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    basket: basketReducer
  },
  preloadedState: {
    // Merge loaded data with initial state structure
    basket: {
      ...basketInitialState,
      ...loadBasketFromStorage()
    }
  }
});

// Subscribe to store changes for localStorage persistence
store.subscribe(() => {
  try {
    const currentBasket = store.getState().basket;
    localStorage.setItem("basket", JSON.stringify(currentBasket));
  } catch (e) {
    console.warn("Failed to save basket to localStorage:", e);
  }
});

export default store;
