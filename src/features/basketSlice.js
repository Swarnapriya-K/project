import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: []
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      console.log(action.payload);
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    increaseQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product) product.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product && product.quantity > 1) product.quantity -= 1;
    }
  }
});

export const { addProduct, removeProduct, increaseQuantity, decreaseQuantity } =
  basketSlice.actions;

export default basketSlice.reducer;
