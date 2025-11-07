import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { itemsApi } from '../../api/itemsApi';

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await itemsApi.getItems();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch items');
    }
  }
);

const initialState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  filters: {
    category: '',
    minPrice: 0,
    maxPrice: 10000,
    searchQuery: '',
  }
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      // Apply filters
      state.filteredItems = state.items.filter(item => {
        const matchesCategory = !state.filters.category || item.category_type === state.filters.category;
        const matchesPrice = item.price >= state.filters.minPrice && item.price <= state.filters.maxPrice;
        const matchesSearch = !state.filters.searchQuery || 
          item.name.toLowerCase().includes(state.filters.searchQuery.toLowerCase());
        
        return matchesCategory && matchesPrice && matchesSearch;
      });
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        minPrice: 0,
        maxPrice: 10000,
        searchQuery: '',
      };
      state.filteredItems = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.filteredItems = action.payload.data;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || action.error.message;
      });
  },
});

export const { setFilters, clearFilters } = itemsSlice.actions;
export default itemsSlice.reducer;