/**
 * @author 오수영
 * @email osy9757@gmail.com
 * @create date 2024-02-28 14:35:24
 * @modify date 2024-02-28 14:35:24
 * @desc 백엔드 api
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
export const fetchStoreUsageStats = async () => {
  try {
    const response = await api.get("/api/v1/stats/storeUsage");
    return response.data;
  } catch (error) {
    console.error("Error fetching store usage stats:", error);
    throw error;
  }
};

// 매장 연령 및 성별 통계 데이터를 가져오는 함수
export const fetchStoreAgeGenderStats = async () => {
  try {
    const response = await api.get("/api/v1/stats/storeAgeGender");
    return response.data;
  } catch (error) {
    console.error("Error fetching store age gender stats:", error);
    throw error;
  }
};

// 재방문률 통계 데이터를 가져오는 함수
export const fetchRevisitRates = async () => {
  try {
    const response = await api.get("/api/v1/stats/revisitRate");
    return response.data;
  } catch (error) {
    console.error("Error fetching revisit rates:", error);
    throw error;
  }
};

// 프로모션 효과 통계 데이터를 가져오는 함수
export const fetchPromotionEffectStats = async () => {
  try {
    const response = await api.get("/api/v1/stats/promotionEffect");
    return response.data;
  } catch (error) {
    console.error("Error fetching promotion effect stats:", error);
    throw error;
  }
};
