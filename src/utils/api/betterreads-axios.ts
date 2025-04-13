import axios, { AxiosRequestConfig } from 'axios';
import { getAccessTokenAction } from '@/utils/action/auth/get-access-token.action';

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:5252',
};

export const betterreadsAxios = axios.create(axiosConfig);
export const noRetryBetterreadsAxios = axios.create(axiosConfig);

betterreadsAxios.interceptors.request.use(async (requestConfig) => {
  requestConfig.headers['access_token'] = await getAccessTokenAction();
  return requestConfig;
});
