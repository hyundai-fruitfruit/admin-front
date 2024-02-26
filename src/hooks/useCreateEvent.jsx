/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-02-26 22:49:59
 * @modify date 2024-02-26 22:49:59
 * @desc 이벤트 생성 훅
 */
import { useState } from 'react';
import { createEvent } from '../services/eventService';

export const useCreateEvent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateEvent = async (eventDetails) => {
        setLoading(true);
        try {
            const data = await createEvent(eventDetails);
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            setError(error);
            throw error;
        }
    };

    return { handleCreateEvent, loading, error };
};
