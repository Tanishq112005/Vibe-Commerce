// src/store/slice/shopSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { shopApi } from '../../api/shopApi';

export const createShop = createAsyncThunk(
   'shop/createShop',
   async (shopData, { rejectWithValue }) => {
      try {
         const response = await shopApi.addShop(shopData);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data || 'Failed to create shop');
      }
   }
);

// Helper variable to read from storage
const storedShop = JSON.parse(localStorage.getItem('shop'));

const initialState = {
   shop: storedShop || null, // Load from storage
   loading: false,
   error: null,
   shopCreated: !!storedShop, // Set based on storage
};

const shopSlice = createSlice({
   name: 'shop',
   initialState,
   reducers: {
      clearShopError: (state) => {
         state.error = null;
      },
      resetShopState: (state) => {
         state.shop = null;
         state.loading = false;
         state.error = null;
         state.shopCreated = false;
         localStorage.removeItem('shop'); // Clear from storage
      },
      setShop: (state, action) => {
         state.shop = action.payload;
         state.shopCreated = true;
         localStorage.setItem('shop', JSON.stringify(action.payload)); // Save to storage
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(createShop.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(createShop.fulfilled, (state, action) => {
            state.loading = false;
            state.shop = action.payload.data;
            state.shopCreated = true;
            state.error = null;
            localStorage.setItem('shop', JSON.stringify(action.payload.data)); // Save to storage
         })
         .addCase(createShop.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.msg || action.error.message;
         });
   },
});

export const { clearShopError, resetShopState, setShop } = shopSlice.actions;
export default shopSlice.reducer;