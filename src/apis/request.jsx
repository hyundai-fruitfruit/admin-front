/**
 * @author 오수영
 * @email osy9757@gmail.com
 * @create date 2024-02-28 14:35:24
 * @modify date 2024-02-28 14:35:24
 * @desc [description]
 */
import api from "./api";

// 이벤트에 따른 참여 인원 목록 출력
export const getEventMember = async (eventID) => {
  try {
    const response = await api.get(`/api/v1/admin/events/${eventID}/participants`);

    return response.data;
  } catch (error) {
    console.error("Error fetching event member by event id:", error);
    throw error;
  }
};
