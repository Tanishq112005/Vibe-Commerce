// src/store/slice/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartApi } from '../../api/cartApi';

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartApi.getCartItems();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch cart items');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  // 1. Accept the full 'item' object, not just 'item_id'
  async ({ item, quantity }, { rejectWithValue }) => {
    try {
      // 2. Send the item's ID (item.id) to the API as 'item_id'
      const response = await cartApi.addToCart({ item_id: item.id, quantity }); 
      
      // 3. Return BOTH the API response AND the original product details
      return { newCartItem: response.data, productDetails: item };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add item to cart');
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ item_id, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartApi.updateCartItem(item_id, quantity);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update cart item');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (item_id, { rejectWithValue }) => {
    try {
      await cartApi.removeFromCart(item_id);
      return item_id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to remove item from cart');
    }
  }
);

export const clearServerCart = createAsyncThunk(
  'cart/clearServerCart',
  async (_, { rejectWithValue }) => {
    try {
      await cartApi.clearCart();
      return;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to clear cart');
    }
  }
);

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },
    clearCartError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart items
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.totalItems = action.payload.data.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = action.payload.data.reduce((total, item) => total + (item.price * item.quantity), 0);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || action.error.message;
        state.items = [];
        state.totalItems = 0;
        state.totalAmount = 0;
      })
      // Add to cart
      .addCase(addToCart.fulfilled, (state, action) => {
        // 4. Get both parts from the payload
        const { newCartItem, productDetails } = action.payload;

        // 5. Find existing item
        const existingItem = state.items.find(item => item.item_id === newCartItem.item_id);
        
        if (existingItem) {
          // 6. Only update quantity
          existingItem.quantity = newCartItem.quantity;
        } else {
          // 7. FIX: Combine product details (name, price) with cart details (quantity)
          state.items.push({ 
            ...productDetails, // (e.g., name, price, image_url, id)
            item_id: newCartItem.item_id, // from cart item
            quantity: newCartItem.quantity, // from cart item
            cart_id: newCartItem.id // from cart item (the cart row id)
          });
        }
        
      	 // 8. Recalculate totals
      	 state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      	 state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      })
      // Update cart item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const itemIndex = state.items.findIndex(item => item.item_id === action.payload.data.item_id);
      	 if (itemIndex !== -1) {
      	 	 state.items[itemIndex].quantity = action.payload.data.quantity;
      	 	 state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      	 	 state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      	 }
      })
      // Remove from cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
      	 state.items = state.items.filter(item => item.item_id !== action.payload);
      	 state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      	 state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      })
      // Clear server cart
      .addCase(clearServerCart.fulfilled, (state) => {
      	 state.items = [];
      	 state.totalItems = 0;
      	 state.totalAmount = 0;
      });
  },
});

export const { clearCart, clearCartError } = cartSlice.actions;
export default cartSlice.reducer;