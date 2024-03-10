/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-03-08 09:10:18
 * @modify date 2024-03-10 13:48:23
 * @desc 이벤트 참여율 TOP 5
 */
import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';


const getRandomDate = () => {
  const start = new Date(2023, 10, 11).getTime();
  const end = new Date(2024, 3, 15).getTime();
  return new Date(start + Math.random() * (end - start));
};

const generateRandomEvents = () => {
  const events = [
    { title: '지금 스케쳐스로 가볼까?', participationRate: 70 },
    { title: '주말 특별 캐시백 이벤트', participationRate: 60 },
    { title: '신상품 런칭 기념 할인', participationRate: 45 },
    { title: '오후 5시 이후 해피아워 할인', participationRate: 43 },
    { title: '추석맞이 더블 경험치 증정 이벤트', participationRate: 41 },
  ];

  // 날짜를 랜덤으로 설정
  events.forEach(event => {
    event.date = getRandomDate();
  });

  // 참여 비율을 기준으로 이벤트를 내림차순 정렬
  events.sort((a, b) => b.participationRate - a.participationRate);

  return events;
};

const TopProducts = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        setEvents(generateRandomEvents());
    }, []);

    return (
        <>
            <div className="card-body">
                <div className="widget-media">
                    <ul className="timeline">
                        {events.map((event, ind) => (
                            <li key={ind}>
                                <div className="timeline-panel">
                                    <div className="media me-2 media-info">
                                        <span>No.{ind + 1}</span>
                                    </div>
                                    <div className="media-body">
                                        <h5 className="mb-1 text-white">{event.title}</h5>
                                        <small className="d-block">{event.date.toLocaleDateString()}</small>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <ProgressBar now={event.participationRate} variant="info" striped style={{ width: '100%' }} />
                                            <span style={{ marginLeft: '10px', whiteSpace: 'nowrap' }}>{event.participationRate}%</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default TopProducts;
