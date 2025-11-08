// src/store/slice/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderApi } from '../../api/orderApi';

export const placeOrder = createAsyncThunk(
   'orders/placeOrder',
   async (orderData, { rejectWithValue }) => {
      try {
         const response = await orderApi.createOrder(orderData);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data || 'Failed to place order');
      }
   }
);

export const getOrders = createAsyncThunk(
   'orders/getOrders',
   async (_, { rejectWithValue }) => {
      try {
         const response = await orderApi.getMyOrders();
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data || 'Failed to fetch orders');
      }
   }
);

export const deleteOrder = createAsyncThunk(
   'orders/deleteOrder',
   async (orderId, { rejectWithValue }) => {
      try {
         await orderApi.removeOrder(orderId);
         return orderId;
      } catch (error) {
         return rejectWithValue(error.response?.data || 'Failed to delete order');
      }
   }
);

const initialState = {
   orders: [],
   loading: false,
   error: null,
};

const orderSlice = createSlice({
   name: 'orders',
   initialState,
   reducers: {
      clearOrderError: (state) => {
         state.error = null;
      },
   },
   extraReducers: (builder) => {
      builder
         // Place order
         .addCase(placeOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(placeOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.orders.unshift(action.payload.order);
         })
         .addCase(placeOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.msg || action.error.message;
         })
         // Get orders
         .addCase(getOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload.orders || [];
         })
         .addCase(getOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.msg || action.error.message;
            state.orders = []; // <-- FIX: Clear orders on error
         })
         // Delete order
         .addCase(deleteOrder.fulfilled, (state, action) => {
            state.orders = state.orders.filter(order => order.id !== action.payload);
         });
   },
});

export const { clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;