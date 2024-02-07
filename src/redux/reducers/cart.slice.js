import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  purchasedCourses: [],
  cartPackIds:[],
  error: '',
  message: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        state.cart = action.payload; 
        state.error = '';
        state.message = '';
      },
      removeFromCart: (state, action) => {
        const itemIdToRemove = action.payload;
        state.cart = state.cart.filter(item => item.id !== itemIdToRemove);
        state.error = '';
        state.message = '';
      },

      removeAllFromCart: (state, action) => {
        const itemIdToRemove = action.payload;
        state.cart = state.cart.filter((item) => (item.packId !== itemIdToRemove));
        state.error = '';
        state.message = '';
      },

      savePurchasedCourses: (state, action) => {
        state.purchasedCourses = action.payload;
        state.error = '';
        state.message = '';
      },
      saveCartPackIds: (state, action) => {
        state.cartPackIds = action.payload;
        
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
 removeAllFromCart,
 savePurchasedCourses,
 saveCartPackIds,
 clearCart,
} = actions;

export default reducer;


