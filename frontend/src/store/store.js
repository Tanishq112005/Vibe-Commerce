// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import cartReducer from './slice/cartSlice';
import itemsReducer from './slice/itemsSlice';
import shopReducer from './slice/shopSlice';
import shopItemsReducer from './slice/shopItemsSlice';
import orderReducer from './slice/orderSlice'; // <-- CORRECTED

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    items: itemsReducer,
    shop: shopReducer,
    shopItems: shopItemsReducer,
    orders: orderReducer, // <-- CORRECTED
  },
});

export default store;