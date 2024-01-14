import axios, { AxiosResponse, AxiosError } from 'axios';
import { Item } from '../interfaces';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

type ApiResponse<T> = Promise<AxiosResponse<T>>;
type ApiError = Promise<AxiosError>;

export const itemApiService = {
  getItems: (): ApiResponse<Item[]> => axiosInstance.get('/items'),

  createItem: (newItem: Item): ApiResponse<Item> => axiosInstance.post('/items', newItem),

  updateItem: (tokenId: string, updatedItem: Item): ApiResponse<Item> => axiosInstance.put(`/items/${tokenId}`, updatedItem),

  deleteItem: (tokenId: string): ApiError => axiosInstance.delete(`/items/${tokenId}`),
};
