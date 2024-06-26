import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import thunk from 'redux-thunk';
import storage from './storage';
import authReducer from './reducers/auth.slice';
import mainReducer from './reducers/main.slice';
import chatReducer from './reducers/chat.slice';
import cartReducer from './reducers/cart.slice';
// import chatReducer from '../chat-src/redux/slices/chat';



const reducers = combineReducers({
  auth: authReducer,
  main: mainReducer,
  cart: cartReducer,
  chat: chatReducer,
  
 
});

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});


export default store;
