import axios, { AxiosResponse, AxiosError } from 'axios';
import { Item } from '../interfaces';

const API_BASE_URL = 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

type ApiResponse<T> = Promise<AxiosResponse<T>>;
type ApiError = Promise<AxiosError>;

export const apiService = {
  getItems: (): ApiResponse<Item[]> => axiosInstance.get('/items'),

  createItem: (newItem: Item): ApiResponse<Item> => axiosInstance.post('/items', newItem),

  updateItem: (id: string, updatedItem: Item): ApiResponse<Item> => axiosInstance.put(`/items/${id}`, updatedItem),

  deleteItem: (id: string): ApiError => axiosInstance.delete(`/items/${id}`),
};
