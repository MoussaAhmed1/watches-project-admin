import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';



export interface Params {
  page: number;
  limit: number;
  status?: string;
  filters?: string;
  created_at?: string;
  headers?: { access_token: string };
}
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_API,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});
axios.interceptors.request.use(
  (config) => {
    config.headers['Accept-Language'] = "en";
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

export const baseUrl = process.env.NEXT_PUBLIC_HOST_API;

export const fetcher = async ({ url, config }: { url: string; config?: AxiosRequestConfig }) => {
  // Use axiosInstance directly instead of creating a new instance
  const response = await axiosInstance.get(url, {
    ...config,
    headers: {
      'Accept-Language': 'en',
    },
  });

  return response.data;
};
export const getErrorMessage = (error: unknown): string => {
  let message: string;
  if (error instanceof Error) {
    // eslint-disable-next-line prefer-destructuring
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message);
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Something went wrong';
  }
  return message;
};

export const endpoints = {
doctors:{
  fetch:"/doctor"
},
users:{
  fetch:"/user"
},
nurse_orders:{
  fetch:"/nurse/order"
},
reservations:{
  fetch:"/reservation"
},
};
