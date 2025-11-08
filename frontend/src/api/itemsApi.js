
// CORRECT
import axios from '../utils/axiosConfig'; // <-- FIX
const BASE_URL = '/items'; // Base URL is already set in axiosConfig

export const itemsApi = {
 getItems: () => {
  return axios.get(`${BASE_URL}/getItems`);
 },
};