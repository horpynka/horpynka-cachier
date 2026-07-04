import axios from 'axios';
import { Configuration, OrdersApi } from '../generated';


const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});

const configuration = new Configuration({
  basePath: process.env.EXPO_PUBLIC_API_URL,
});

export const ordersApi = new OrdersApi(
  configuration,
  undefined,
  apiClient
);