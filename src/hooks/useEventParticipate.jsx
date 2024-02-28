/**
 * @author 엄상은
 * @email sangeun.e.9@gmail.com
 * @create date 2024-02-28 09:49:49
 * @modify date 2024-02-28 09:49:49
 * @desc 이벤트 참여 관련 hook
 */

import { useState, useEffect } from 'react';
import { participateEvent } from "api/request";

export const useParticipateEvent = (eventId, memberId) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await participateEvent(eventId, memberId);
                setData(response);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [eventId, memberId]);

    return { data, loading, error };
};
