// src/store/slices/shopItemsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { shopItemsApi } from '../../api/shopItemsApi';

export const fetchShopItems = createAsyncThunk(
  'shopItems/fetchShopItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await shopItemsApi.shopKeeperItems();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch items');
    }
  }
);

export const addShopItem = createAsyncThunk(
  'shopItems/addItem',
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await shopItemsApi.addItem(itemData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add item');
    }
  }
);

export const updateShopItem = createAsyncThunk(
  'shopItems/updateItem',
  async ({ id, updatedFields }, { rejectWithValue }) => {
    try {
      const response = await shopItemsApi.updateItem(id, updatedFields);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update item');
    }
  }
);

export const deleteShopItem = createAsyncThunk(
  'shopItems/deleteItem',
  async (itemId, { rejectWithValue }) => {
    try {
      await shopItemsApi.deleteItem(itemId);
      return itemId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete item');
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const shopItemsSlice = createSlice({
  name: 'shopItems',
  initialState,
  reducers: {
    clearShopItemsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch items
      .addCase(fetchShopItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(fetchShopItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || action.error.message;
      })
      // Add item
      .addCase(addShopItem.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
      })
      // Update item
      .addCase(updateShopItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.data.id);
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
      })
      // Delete item
      .addCase(deleteShopItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { clearShopItemsError } = shopItemsSlice.actions;
export default shopItemsSlice.reducer;