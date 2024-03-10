/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-02-24 21:41:02
 * @modify date 2024-02-24 21:41:02
 * @desc 이벤트 관련 훅
 */
// hooks/useEvents.jsx
import { useState, useEffect, useCallback } from 'react';
import { fetchAllEvents, deleteEvent as deleteEventService } from '../services/eventService.js';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetchEvents 함수를 useCallback으로 정의하여 useEffect 및 deleteEvent에서 사용
  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchAllEvents();
      const eventData = response.data.events;

      if (Array.isArray(eventData)) {
        setEvents(eventData);
      } else {
        console.error("Received data is not an array", eventData);
        setEvents([]); // 배열이 아닌 경우에 대한 처리
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Fetching events failed: ", error);
      setError(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const deleteEvent = useCallback(async (id) => {
    try {
      await deleteEventService(id);
      await fetchEvents(); // 삭제 후 이벤트 목록을 새로고침
    } catch (error) {
      console.error("이벤트 삭제 실패:", error);
      setError(error);
    }
  }, [fetchEvents]); // fetchEvents를 의존성 배열에 포함

  return { events, isLoading, error, fetchEvents, deleteEvent }; 
};
