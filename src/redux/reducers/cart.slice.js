import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  purchasedCourses: [],
  cartPackIds:[],
  error: '',
  message: '',
  cartToProcess:{},
  mostRecentPayToken:'',
  mostRecentOrderAmount:'',
  mostRecentOrderId:''
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

      saveCartToProcess: (state, action) => {
        state.cartToProcess = action.payload;
        
      },

      saveMostRecentPayToken: (state, action) => {
        state.mostRecentPayToken = action.payload;
        
      },

      saveMostRecentOrderAmount: (state, action) => {
        state.mostRecentOrderAmount = action.payload;
        
      },

      saveMostRecentOrderId: (state, action) => {
        state.mostRecentOrderId = action.payload;
        
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
 saveCartToProcess,
 saveMostRecentOrderAmount,
 saveMostRecentOrderId,
 saveMostRecentPayToken,
 clearCart,
} = actions;

export default reducer;


