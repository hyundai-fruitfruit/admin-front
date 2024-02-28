/**
 * @author 엄상은
 * @email sangeun.e.9@gmail.com
 * @create date 2024-02-28 09:49:49
 * @modify date 2024-02-28 09:49:49
 * @desc 커스텀 API 모듈
 */
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((request) => {
  console.log(`Request URL: ${request.baseURL}${request.url}`);
  return request;
});

export default api;
