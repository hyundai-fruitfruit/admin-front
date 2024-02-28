/**
 * @author 엄상은
 * @email sangeun.e.9@gmail.com
 * @create date 2024-02-28 09:49:49
 * @modify date 2024-02-28 09:49:49
 * @desc 이벤트 참여 API 연결
 */

import api from 'api/api';

// 이벤트 참여 API
export const participateEvent = async (eventId, memberId) => {
    try {
        const response = await api.post(`/api/v1/admin/events/${eventId}/participate?memberId=${memberId}`);
        return response.data;
    } catch (error) {
        console.error(`Error: ${error}`);
        throw error;
    }
}
