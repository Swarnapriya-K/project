import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  products: []
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product.productId._id === action.payload.productId._id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.productId._id !== action.payload
      );
    },
    increaseQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.productId._id === action.payload
      );
      if (product) product.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.productId._id === action.payload
      );
      if (product && product.quantity > 1) product.quantity -= 1;
    }
  }
});

export const {
  addProducts,
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity
} = basketSlice.actions;

export default basketSlice.reducer;
