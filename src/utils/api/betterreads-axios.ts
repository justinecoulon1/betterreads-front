import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:5252',
};

export const betterreadsAxios = axios.create(axiosConfig);
