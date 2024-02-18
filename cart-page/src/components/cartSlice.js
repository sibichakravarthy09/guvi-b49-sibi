// store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  // Initially, your cart is empty
];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const itemIndex = state.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state[itemIndex].quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity(state, action) {
      const itemIndex = state.findIndex(item => item.id === action.payload);
      state[itemIndex].quantity++;
    },
    decrementQuantity(state, action) {
      const itemIndex = state.findIndex(item => item.id === action.payload);
      if (state[itemIndex].quantity > 1) {
        state[itemIndex].quantity--;
      } else {
        state.splice(itemIndex, 1);
      }
    }
  }
});

export const { addItem, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
