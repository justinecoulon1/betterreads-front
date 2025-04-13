import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { getSession } from '@/utils/action/auth/get-session.action';
import { refreshSession } from '@/utils/action/auth/refresh-session.action';

type RetryableAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry: boolean;
};

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:5252',
};

export const betterreadsAxios = axios.create(axiosConfig);
export const noRetryBetterreadsAxios = axios.create(axiosConfig);

betterreadsAxios.interceptors.request.use(async (requestConfig) => {
  requestConfig.headers['access_token'] = (await getSession()).accessToken;
  console.log('ACCESS TOKEN:', requestConfig.headers['access_token']);
  return requestConfig;
});

betterreadsAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const axiosError = error as AxiosError;
    const originalRequestConfig = axiosError.config as RetryableAxiosRequestConfig;

    if (error.response?.status === 401 && originalRequestConfig && !originalRequestConfig._retry) {
      console.log('GO REFRESH');
      originalRequestConfig._retry = true;
      try {
        await refresh();
        console.log('REFRESHED SESSION:', await getSession());
        originalRequestConfig.headers['access_token'] = (await getSession()).accessToken;
        console.log('NEW ACCESS TOKEN:', originalRequestConfig.headers['access_token']);
        return betterreadsAxios(originalRequestConfig);
      } catch (refreshError) {
        console.error('FAILED TO REFRESH:', error);
        return Promise.reject(refreshError);
      }
    }
    console.error(error.response?.data);
    return Promise.reject(error);
  },
);

type RefreshSubscriber = { resolve: () => void; reject: (error: unknown) => void };
let isRefreshing = false;
let refreshSubscribers: RefreshSubscriber[] = [];

const refresh = async () => {
  if (!isRefreshing) {
    isRefreshing = true;
    try {
      await refreshSession();

      isRefreshing = false;
      refreshSubscribers.forEach((subscriber) => subscriber.resolve());
      refreshSubscribers = [];
      return true;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      isRefreshing = false;
      refreshSubscribers.forEach((subscriber) => subscriber.reject(error));
      refreshSubscribers = [];
      throw error;
    }
  } else {
    return new Promise((resolve, reject) => {
      refreshSubscribers.push({
        resolve: () => resolve(true),
        reject: (error) => reject(error),
      });
    });
  }
};
