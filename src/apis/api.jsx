/**
 * @author 오수영
 * @email osy9757@gmail.com
 * @create date 2024-02-28 14:35:24
 * @modify date 2024-02-28 14:35:24
 * @desc api 모듈
 */
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_AUTH_TOKEN = process.env.REACT_APP_API_AUTH_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${API_AUTH_TOKEN}`, // 환경 변수에서 가져온 토큰 사용
  },
  withCredentials: true,
});

api.interceptors.request.use((request) => {
  console.log(`Request URL: ${request.baseURL}${request.url}`);
  return request;
});

export default api;
