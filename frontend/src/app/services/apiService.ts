// frontend/src/services/apiService.ts
import axios, { AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your backend API URL

// Create a reusable Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Adjust as needed
});

// Define the types for your API response and error
type ApiResponse<T> = Promise<AxiosResponse<T>>;
type ApiError = Promise<AxiosError>;

// Define your API endpoints as functions
export const apiService = {
  // Example API endpoint for fetching items
  getItems: (): ApiResponse<Item[]> => axiosInstance.get('/items'),

  // Example API endpoint for creating an item
  createItem: (newItem: Item): ApiResponse<Item> => axiosInstance.post('/items', newItem),

  // Example API endpoint for updating an item by ID
  updateItem: (id: string, updatedItem: Item): ApiResponse<Item> => axiosInstance.put(`/items/${id}`, updatedItem),

  // Example API endpoint for deleting an item by ID
  deleteItem: (id: string): ApiError => axiosInstance.delete(`/items/${id}`),
};

// Define your data models
interface Item {
  title: string;
  description: string;
  imageUrl: string;
}
