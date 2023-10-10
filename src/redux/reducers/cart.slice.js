import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  purchasedCourses: [],
  error: '',
  message: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        state.cart.push(action.payload); 
        state.error = '';
        state.message = '';
      },
      removeFromCart: (state, action) => {
        const itemIdToRemove = action.payload;
        state.cart = state.cart.filter(item => item.id !== itemIdToRemove);
        state.error = '';
        state.message = '';
      },
      savePurchasedCourses: (state, action) => {
        state.purchasedCourses = action.payload;
        state.error = '';
        state.message = '';
      },
    clearCart: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = cartSlice;

export const {
 addToCart,
 removeFromCart,
 savePurchasedCourses,
 clearCart,
} = actions;

export default reducer;


