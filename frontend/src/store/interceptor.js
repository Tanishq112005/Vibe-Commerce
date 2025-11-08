// src/store/interceptor.js
import axios from '../utils/axiosConfig';
import { logout } from './slice/authSlice';
import { resetShopState } from './slice/shopSlice';

export const setupAxiosInterceptor = (store) => {
  axios.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response;
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      if (error.response?.status === 401) {
        
        // This is the fix: Dispatch logout actions to clear Redux state
        // and remove user/shop data from localStorage
        store.dispatch(logout());
        store.dispatch(resetShopState());
        
        // Redirect to login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }

      // Handle network errors
      if (!error.response) {
        console.error('Network error:', error.message);
        return Promise.reject(new Error('Network error. Please check your connection.'));
      }

      return Promise.reject(error);
    }
  );
};