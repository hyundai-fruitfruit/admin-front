/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-02-24 21:44:58
 * @modify date 2024-03-10 15:22:05
 * @desc 이벤트 관련 서비스 레이아웃
 */

import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/admin/events`;
//const BASE_URL = '/api/v1/admin/events'
const AUTH_HEADERS = {
  Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
};

export const fetchAllEvents = async () => {
  try {
    const response = await axios.get(BASE_URL, { headers: AUTH_HEADERS });
    return response.data;
  } catch (error) {
    console.error("이벤트를 불러오는 중 오류 발생", error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, { headers: AUTH_HEADERS });
    return response.data;
  } catch (error) {
    console.error("이벤트 삭제 중 오류 발생", error);
    throw error;
  }
};

export const createEvent = async (eventDetails) => {
  try {
    const response = await axios.post(BASE_URL, eventDetails, {
      headers: AUTH_HEADERS,
    });
    return response.data;
  } catch (error) {
    console.error("이벤트 생성 중 오류 발생", error);
    throw error;
  }
};
