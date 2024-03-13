/**
 * @author 오수영
 * @email osy9757@gmail.com
 * @create date 2024-02-28 14:58:28
 * @modify date 2024-02-28 14:58:28
 * @desc backend 이벤트 api 연결
 */
import { useState } from "react";
import { getEventMember } from "apis/request";

const useGetEventMembers = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState(null);

  const fetchEventMembers = async (eventID) => {
    setLoading(true);
    try {
      const data = await getEventMember(eventID);
      setMembers(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchEventMembers, members, error, loading };
};

export default useGetEventMembers;
