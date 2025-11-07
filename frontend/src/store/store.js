// src/store/index.js (updated)
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import cartReducer from './slice/cartSlice';
import itemsReducer from './slice/itemsSlice';
import shopReducer from './slice/shopSlice';
import shopItemsReducer from './slice/shopItemsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    items: itemsReducer,
    shop: shopReducer,
    shopItems: shopItemsReducer,
  },
});

export default store;