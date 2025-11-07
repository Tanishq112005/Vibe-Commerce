
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartApi } from '../../api/cartApi';

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartApi.getCart();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch cart items');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ item_id, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartApi.addItem(item_id, quantity);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add item to cart');
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ item_id, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartApi.updateItem(item_id, quantity);
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
      await cartApi.deleteItem(item_id);
      return item_id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to remove item from cart');
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
      })
      // Add to cart
      .addCase(addToCart.fulfilled, (state, action) => {
        const existingItem = state.items.find(item => item.item_id === action.payload.data.item_id);
        if (existingItem) {
          existingItem.quantity += action.payload.data.quantity;
        } else {
          state.items.push(action.payload.data);
        }
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
      });
  },
});

export const { clearCartError } = cartSlice.actions;
export default cartSlice.reducer;