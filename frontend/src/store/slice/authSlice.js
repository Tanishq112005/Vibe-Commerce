// src/store/slice/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/authApi';
import axios from 'axios'; // Import default axios to set headers

export const loginUser = createAsyncThunk(
   'auth/login',
   async ({ email, password }, { rejectWithValue }) => {
      try {
         const response = await authApi.login(email, password);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data || 'Login failed');
      }
   }
);

export const signupUser = createAsyncThunk(
   'auth/signup',
   async (userData, { rejectWithValue }) => {
      try {
         const response = await authApi.signup(userData);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data || 'Signup failed');
      }
   }
);

const initialState = {
   isAuthenticated: !!localStorage.getItem('token'), // Check for token
   user: JSON.parse(localStorage.getItem('user')) || null, // Load user from storage
   token: localStorage.getItem('token'),
   loading: false,
   error: null,
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state) => {
         state.isAuthenticated = false;
         state.user = null;
         state.token = null;
         state.loading = false;
         state.error = null;
         
         // Clear all auth-related items from storage
         localStorage.removeItem('token');
         localStorage.removeItem('user');
         // We also tell the shopSlice to clear itself, but just in case, clear local storage here
         localStorage.removeItem('shop'); 
         
         delete axios.defaults.headers.common['Authorization'];
      },
      clearError: (state) => {
         state.error = null;
      },
      initializeAuth: (state) => {
         const token = localStorage.getItem('token');
         const user = JSON.parse(localStorage.getItem('user')); // Load user
         
         if (token && user) {
            state.token = token;
            state.user = user; // Set user
            state.isAuthenticated = true;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
         } else {
        // If token or user is missing, force logout
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      }
      },
   },
   extraReducers: (builder) => {
      builder
         // Login cases
         .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.data;
            state.token = action.payload.token;
            state.error = null;
            
            // Store token and user object
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.data));
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = action.payload?.msg || action.error.message;
         })
         // Signup cases
         .addCase(signupUser.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(signupUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.data;
            state.token = action.payload.token;
            state.error = null;
            
            // Store token and user object
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.data));
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
         })
         .addCase(signupUser.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = action.payload?.msg || action.error.message;
         });
   },
});

export const { logout, clearError, initializeAuth } = authSlice.actions;
export default authSlice.reducer;